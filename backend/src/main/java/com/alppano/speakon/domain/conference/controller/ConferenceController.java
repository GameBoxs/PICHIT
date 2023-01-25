package com.alppano.speakon.domain.conference.controller;

import java.util.Map;

import javax.annotation.PostConstruct;

import com.alppano.speakon.domain.conference.service.HttpRequestService;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.logging.log4j.util.PerformanceSensitive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/conference")
public class ConferenceController {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @Autowired
    private HttpRequestService httpRequestService;

    @PostConstruct
    public void init() {
        // OPENVIDU 초기화
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
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
    public ResponseEntity<String> selectInterviewee(@RequestBody Map<String, Object> params) throws Exception {
        String session = (String)  params.get("session");
        String requester = (String) params.get("requester");
        String interviewee = (String) params.get("interviewee");
        //TODO: 검사 - 요청자가 방장인가

        HttpResponse response =	httpRequestService.broadCastSignal(session, "broadcast-interviewee", interviewee);
        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());
        //TODO: response 처리 200-성공, 404-존재하지 않는 세션, 400-파라미터 오류, 406-수신자 오류(참여자 없음or유효하지 않은 커넥션ID)

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 질문 제안 요청
    @PostMapping("/interview/question/propose")
    public ResponseEntity<String> proposeQuestion(@RequestBody Map<String, Object> params) throws Exception {
        String session = (String)  params.get("session");
        String requester = (String) params.get("requester");
        String interviewee = (String) params.get("interviewee");
        String questionId = (String) params.get("questionId");
        //TODO: 이미 질문이 '시작'되어 진행 중인지 검사 -> 진행 중이면 요청 거절
        //TODO: 질문 시작되었음을 기록

        HttpResponse response = httpRequestService.broadCastSignal(session, "broadcast-question-start", questionId);
        System.out.println(response);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 질문 종료 요청
    @PostMapping("/interview/question/end")
    public ResponseEntity<String> endQuestion(@RequestBody Map<String, Object> params) throws Exception {
        String session = (String)  params.get("session");
        String requester = (String) params.get("requester");
        String interviewee = (String) params.get("interviewee");
        String questionId = (String) params.get("questionId");
        //TODO: 이미 질문이 '시작'되어 진행 중인지 검사 -> 질문이 진행 중이지 않은 상태면 요청 거절
        //TODO: 진행중인 질문자와 동일인인지 검사
        //TODO: 질문이 종료 되었음을 기록

        HttpResponse response = httpRequestService.broadCastSignal(session, "broadcast-question-end", questionId);
        System.out.println(response);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 현재 진행 중인 면접자 XXX의 '인터뷰' 종료 요청
    @PostMapping("/interview/end")
    public ResponseEntity<String> endInterview(@RequestBody Map<String, Object> params) throws Exception {
        String session = (String)  params.get("session");
        String requester = (String) params.get("requester");
        String interviewee = (String) params.get("interviewee");
        //TODO: 검사 - 현재 진행 중인 면접자인가
        //TODO: 검사 - 요청자가 방장인가

        HttpResponse response = httpRequestService.broadCastSignal(session, "broadcast-interview-end", interviewee);
        System.out.println(response);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
