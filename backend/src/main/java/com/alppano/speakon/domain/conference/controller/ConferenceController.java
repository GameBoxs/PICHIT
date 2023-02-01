package com.alppano.speakon.domain.conference.controller;

import java.util.Map;

import javax.annotation.PostConstruct;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.domain.conference.dto.ConferenceRequest;
import com.alppano.speakon.domain.conference.service.ConferenceService;
import com.alppano.speakon.domain.conference.service.HttpRequestService;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomDetailInfo;
import com.alppano.speakon.domain.interview_room.service.InterviewRoomService;
import com.alppano.speakon.security.LoginUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/conference")
@Slf4j
public class ConferenceController {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private final HttpRequestService httpRequestService;
    private final ConferenceService conferenceService;
    private final InterviewRoomService interviewRoomService;

    @PostConstruct
    public void init() { // OPENVIDU 초기화
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     OpenVidu에 세션 등록 + Redis에 세션 등록
     */
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params,
                                                    @AuthenticationPrincipal LoginUser loginUser)
            throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {
        SessionProperties properties = SessionProperties.fromJson(params).build(); // 방 이름 미지정 시 sessionId 랜덤값 생성

        Long userId = loginUser.getId();
        Long interviewRoomId = Long.parseLong((String)params.get("interviewRoomId"));
        log.info("세션 생성 요청자 ID: {}", userId);
        log.info("면접방 ID: {}", interviewRoomId);

        InterviewRoomDetailInfo interviewRoomDetailInfo = interviewRoomService.getInterviewRoomDetailInfo(interviewRoomId, userId);
        if(!interviewRoomDetailInfo.getManager().getId().equals(userId)) {
            throw new ResourceForbiddenException("방을 생성할 권한이 없습니다.");
        }

        Session session = openvidu.createSession(properties);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // OpenVidu 세션이 만들어지면 Redis에 회의 정보 등록
        conferenceService.createConference(session.getSessionId(), interviewRoomDetailInfo);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/sessions/close/{sessionId}")
    public ResponseEntity<String> closeConference(@PathVariable("sessionId") String sessionId,
                                                    @AuthenticationPrincipal LoginUser loginUser)
            throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {
        Long userId = loginUser.getId();
        log.info("세션 종료 요청자 ID: {}", userId);
        log.info("면접방 SessionID: {}", sessionId);

        if(!userId.equals(conferenceService.retrieveConference(sessionId).getManagerId())) {
            throw new ResourceForbiddenException("방을 종료할 권한이 없습니다.");
        }

        conferenceService.deleteConference(sessionId);
        Session session = openvidu.getActiveSession(sessionId);
        session.close();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/sessions/connections/{sessionId}")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    // 면접자 지정
    @PostMapping("/interview/interviewee")
    public ResponseEntity<String> selectInterviewee(@RequestBody ConferenceRequest requestDto,
                                                    @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        String sessionId = requestDto.getSessionId();
        String intervieweeId = requestDto.getIntervieweeId();
        //TODO: 검사 - 요청자가 방장인가

        HttpResponse response =	httpRequestService.broadCastSignal(sessionId, "broadcast-interviewee", intervieweeId);
        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());
        //TODO: response 처리 200-성공, 404-존재하지 않는 세션, 400-파라미터 오류, 406-수신자 오류(참여자 없음or유효하지 않은 커넥션ID)

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 질문 제안 요청
    @PostMapping("/interview/question/propose")
    public ResponseEntity<String> proposeQuestion(@RequestBody ConferenceRequest requestDto,
                                                  @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        String sessionId = requestDto.getSessionId();
        String intervieweeId = requestDto.getIntervieweeId();
        String questionId = requestDto.getQuestionId();
        //TODO: 이미 질문이 '시작'되어 진행 중인지 검사 -> 진행 중이면 요청 거절
        //TODO: 질문 시작되었음을 기록

        HttpResponse response = httpRequestService.broadCastSignal(sessionId, "broadcast-question-start", questionId);
        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 질문 종료 요청
    @PostMapping("/interview/question/end")
    public ResponseEntity<String> endQuestion(@RequestBody ConferenceRequest requestDto,
                                              @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        String sessionId = requestDto.getSessionId();
        String intervieweeId = requestDto.getIntervieweeId();
        String questionId = requestDto.getQuestionId();
        //TODO: 이미 질문이 '시작'되어 진행 중인지 검사 -> 질문이 진행 중이지 않은 상태면 요청 거절
        //TODO: 진행중인 질문자와 동일인인지 검사
        //TODO: 질문이 종료 되었음을 기록

        HttpResponse response = httpRequestService.broadCastSignal(sessionId, "broadcast-question-end", questionId);
        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 현재 진행 중인 면접자 XXX의 '인터뷰' 종료 요청
    @PostMapping("/interview/end")
    public ResponseEntity<String> endInterview(@RequestBody ConferenceRequest requestDto,
                                               @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        String sessionId = requestDto.getSessionId();
        String intervieweeId = requestDto.getIntervieweeId();
        //TODO: 검사 - 현재 진행 중인 면접자인가
        //TODO: 검사 - 요청자가 방장인가

        HttpResponse response = httpRequestService.broadCastSignal(sessionId, "broadcast-interview-end", intervieweeId);
        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
