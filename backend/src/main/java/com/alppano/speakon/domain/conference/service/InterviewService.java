package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.RedisUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.conference.dto.InterviewRequest;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class InterviewService {

    private final RedisUtil redisUtil;
    private final HttpRequestService httpRequestService;
    private final InterviewJoinRepository interviewJoinRepository;


    public Conference retrieveConference(Long interviewRoomId) throws JsonProcessingException {
        String key = String.valueOf(interviewRoomId);
        Conference conference = redisUtil.getRedisValue(key, Conference.class);
        if (conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 회의입니다.");
        }
        return conference;
    }

    //TODO: response 처리 200-성공, 404-존재하지 않는 세션, 400-파라미터 오류, 406-수신자 오류(참여자 없음or유효하지 않은 커넥션ID)
    public void selectInterviewee(Long requesterId, InterviewRequest req) throws IOException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if(!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접자를 지정할 권한이 없습니다.");
        }
        if(conference.getCurrentInterviewee() != null) {
            throw new ResourceForbiddenException("이미 진행 중인 면접자가 있습니다.");
        }
        interviewJoinRepository.findByUserIdAndInterviewRoomId(req.getIntervieweeId(), req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("잘못된 유저를 지정하였습니다."));

        HttpResponse response =	httpRequestService.broadCastSignal(conference.getSessionId(), "broadcast-interviewee", String.valueOf(req.getIntervieweeId()));

        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());
        // Redis에 새로 진행 면접자를 UPDATE
        conference.setCurrentInterviewee(req.getIntervieweeId());
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

        HttpResponse response = httpRequestService.broadCastSignal(conference.getSessionId(), "broadcast-question-start", String.valueOf(req.getQuestionId()));

        StatusLine sl = response.getStatusLine();
        System.out.print("STATUS CODE: ");
        System.out.println(sl.getStatusCode());
        // Redis에 새로 진행할 질문을 UPDATE
        conference.setQuestionProceeding(req.getQuestionId());
        redisUtil.setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

}