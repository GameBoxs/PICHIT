package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.RedisUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.conference.dto.InterviewRequest;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;


@Service
@RequiredArgsConstructor
@Slf4j
public class InterviewService {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    private final RedisUtil redisUtil;
    private final HttpRequestService httpRequestService;
    private final InterviewJoinRepository interviewJoinRepository;

    @PostConstruct
    public void init() { // OPENVIDU 초기화
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    //TODO : AOP로 requester가 회의 참여자인지 묶기
    public Conference retrieveConference(Long interviewRoomId) throws JsonProcessingException {
        String key = String.valueOf(interviewRoomId);
        Conference conference = redisUtil.getRedisValue(key, Conference.class);
        if (conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 회의입니다.");
        }
        return conference;
    }

    //TODO: response 처리 200-성공, 404-존재하지 않는 세션, 400-파라미터 오류, 406-수신자 오류(참여자 없음or유효하지 않은 커넥션ID)
    public void selectInterviewee(Long requesterId, InterviewRequest req) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if(!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접자를 지정할 권한이 없습니다.");
        }
        if(conference.getCurrentInterviewee() != null) {
            throw new ResourceForbiddenException("이미 진행 중인 면접자가 있습니다.");
        }
        interviewJoinRepository.findByUserIdAndInterviewRoomId(req.getIntervieweeId(), req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("미참여자를 지정하였습니다."));

        HttpResponse response =	httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-interviewee", String.valueOf(req.getIntervieweeId()));

        openvidu.fetch();
        String recordingFileName = req.getInterviewRoomId() + "_" + req.getIntervieweeId();
        RecordingProperties properties = new RecordingProperties.Builder()
                .name(recordingFileName)
                .hasVideo(false)
                .build();
        Recording recording = openvidu.startRecording(conference.getSessionId(), properties);
        conference.setRecordingId(recording.getId());

        // Redis에 새로 진행할 면접자를 UPDATE
        conference.setCurrentInterviewee(req.getIntervieweeId());
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

    public void endInterview(Long requesterId, InterviewRequest req) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if(!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접을 끝낼 권한이 없습니다.");
        }
        if(conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        interviewJoinRepository.findByUserIdAndInterviewRoomId(req.getIntervieweeId(), req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("미참여자를 지정하였습니다."));

        HttpResponse response = httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-interview-end", String.valueOf(req.getIntervieweeId()));

        openvidu.fetch();
        openvidu.stopRecording(conference.getRecordingId());

        // Redis에 진행 중이던 면접자 삭제
        conference.setCurrentInterviewee(null);
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

    public void proposeQuestion(Long requesterId, InterviewRequest req) throws IOException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("회의 참여자만 질문할 수 있습니다..."));
        if(conference.getQuestionProceeding() != null) {
            throw new ResourceForbiddenException("이미 질문이 진행 중입니다...");
        }
        if(conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        if(!conference.getCurrentInterviewee().equals(req.getIntervieweeId())) {
            throw new ResourceForbiddenException("잘못된 면접자를 지정하였습니다...");
        }

        HttpResponse response = httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-start", String.valueOf(req.getQuestionId()));

        // Redis에 새로 진행할 질문을 UPDATE
        conference.setQuestionProceeding(req.getQuestionId());
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

    public void endQuestion(Long requesterId, InterviewRequest req) throws IOException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("회의 참여자만 질문할 수 있습니다..."));
        if(conference.getQuestionProceeding() == null) {
            throw new ResourceForbiddenException("질문이 진행 중이지 않습니다...");
        }
        if(conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        if(!conference.getCurrentInterviewee().equals(req.getIntervieweeId())) {
            throw new ResourceForbiddenException("잘못된 면접자를 지정하였습니다...");
        }
        if(!conference.getQuestionProceeding().equals(req.getQuestionId())) {
            throw new ResourceForbiddenException("잘못된 질문을 지정하였습니다...");
        }

        HttpResponse response = httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-end", String.valueOf(req.getQuestionId()));

        // Redis에 질문이 끝났다고 UPDATE
        conference.setQuestionProceeding(null);
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

}