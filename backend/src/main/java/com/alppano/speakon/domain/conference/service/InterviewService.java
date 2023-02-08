package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.RedisUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.conference.dto.InterviewRequest;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.question.repository.QuestionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;


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
    private final QuestionRepository questionRepository;

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

    // Redis는 Transactional을 사용할 때 get과 set 로직을 분리해야함
    public void setQuestionProceeding(Long interviewRoomId, Conference conference, Long questionId) throws JsonProcessingException {
        conference.setQuestionProceeding(questionId);
        redisUtil.setRedisValue(String.valueOf(interviewRoomId), conference);
    }

    @Transactional
    public void selectInterviewee(Long requesterId, InterviewRequest req) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if(!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접자를 지정할 권한이 없습니다.");
        }
        if(conference.getCurrentInterviewee() != null) {
            throw new ResourceForbiddenException("이미 진행 중인 면접자가 있습니다.");
        }
        InterviewJoin interviewJoin = interviewJoinRepository.findByUserIdAndInterviewRoomId(req.getIntervieweeId(), req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("미참여자를 지정하였습니다."));

        ObjectMapper objectMapper = new ObjectMapper();
        String signalData = objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-interviewee", signalData);

        interviewJoin.setStartedTime(LocalDateTime.now());

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

        ObjectMapper objectMapper = new ObjectMapper();
        String signalData = objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-interview-end", signalData);

        openvidu.fetch();
        openvidu.stopRecording(conference.getRecordingId());

        // Redis에 진행 중이던 면접자 삭제
        conference.setCurrentInterviewee(null);
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

    @Transactional
    public void proposeQuestion(Long requesterId, InterviewRequest req) throws IOException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("회의 참여자만 질문할 수 있습니다..."));
        Question question = questionRepository.findById(req.getQuestionId()).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 질문입니다...")
        );
        if(conference.getQuestionProceeding() != null) {
            throw new ResourceForbiddenException("이미 질문이 진행 중입니다...");
        }
        if(conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        if(!conference.getCurrentInterviewee().equals(req.getIntervieweeId())) {
            throw new ResourceForbiddenException("잘못된 면접자를 지정하였습니다...");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        String signalData = objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-start", signalData);

        question.setStartedTime(LocalDateTime.now());

        // Redis에 새로 진행할 질문을 UPDATE
//        conference.setQuestionProceeding(req.getQuestionId());
//        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
        setQuestionProceeding(req.getInterviewRoomId(), conference, req.getQuestionId());
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

        ObjectMapper objectMapper = new ObjectMapper();
        String signalData= objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-end", signalData);

        // Redis에 질문이 끝났다고 UPDATE
//        conference.setQuestionProceeding(null);
//        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
        setQuestionProceeding(req.getInterviewRoomId(), conference, null);
    }

}