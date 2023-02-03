package com.alppano.speakon.domain.conference.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.conference.dto.InterviewRequest;
import com.alppano.speakon.domain.conference.service.ConferenceService;
import com.alppano.speakon.domain.conference.service.HttpRequestService;
import com.alppano.speakon.domain.conference.service.InterviewService;
import com.alppano.speakon.security.LoginUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

@Tag(name = "화상회의 관리")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/conference")
@Slf4j
public class ConferenceController {

    private final HttpRequestService httpRequestService;
    private final ConferenceService conferenceService;
    private final InterviewService interviewService;

    /**
     OpenVidu에 세션 등록 + Redis에 세션 등록
     */
    @Operation(summary = "화상회의 세션 생성")
    @PostMapping("/sessions/{interviewRoomId}")
    public ResponseEntity<ApiResponse> createConference(@PathVariable("interviewRoomId") Long interviewRoomId,
                                                    @AuthenticationPrincipal LoginUser loginUser)
            throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {

        Long requesterId = loginUser.getId();
        log.info("세션 생성 요청자 ID: {}", requesterId);
        log.info("면접방 ID: {}", interviewRoomId);

        conferenceService.createConference(requesterId, interviewRoomId);
        ApiResponse result = new ApiResponse(Boolean.TRUE, "세션 생성 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "화상회의 세션 종료")
    @DeleteMapping("/sessions/close/{interviewRoomId}")
    public ResponseEntity<ApiResponse> closeConference(@PathVariable("interviewRoomId") Long interviewRoomId,
                                                    @AuthenticationPrincipal LoginUser loginUser)
            throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {
        Long requesterId = loginUser.getId();
        log.info("세션 종료 요청자 ID: {}", requesterId);
        log.info("면접방 ID: {}", interviewRoomId);

        conferenceService.closeConference(requesterId, interviewRoomId);
        ApiResponse result = new ApiResponse(Boolean.TRUE, "세션 종료 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "화상회의 토큰 발급)")
    @GetMapping("/sessions/connections/{interviewRoomId}")
    public ResponseEntity<ApiResponse<String>> getSessionToken(@PathVariable("interviewRoomId") Long interviewRoomId,
                                                               @AuthenticationPrincipal LoginUser loginUser)
            throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {
        Long requesterId = loginUser.getId();
        String token = conferenceService.getSessionToken(requesterId, interviewRoomId);

        ApiResponse<String> result = new ApiResponse(Boolean.TRUE, "토큰 발급 성공", token);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // ===== 인터뷰 관련 =====

    @Operation(summary = "면접자 지정(인터뷰 시작)")
    @PostMapping("/interview/interviewee")
    public ResponseEntity<String> selectInterviewee(@RequestBody InterviewRequest requestDto,
                                                    @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        interviewService.selectInterviewee(loginUser.getId(), requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 현재 진행 중인 면접자 XXX의 '인터뷰' 종료 요청
    @Operation(summary = "인터뷰 종료")
    @PostMapping("/interview/end")
    public ResponseEntity<String> endInterview(@RequestBody InterviewRequest requestDto,
                                               @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        interviewService.endInterview(loginUser.getId(), requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "질문 제안")
    @PostMapping("/interview/question/propose")
    public ResponseEntity<String> proposeQuestion(@RequestBody InterviewRequest requestDto,
                                                  @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        interviewService.proposeQuestion(loginUser.getId(), requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "질문 종료")
    @PostMapping("/interview/question/end")
    public ResponseEntity<String> endQuestion(@RequestBody InterviewRequest requestDto,
                                              @AuthenticationPrincipal LoginUser loginUser) throws Exception {
        interviewService.endQuestion(loginUser.getId(), requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
