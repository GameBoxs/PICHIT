package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.RedisUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomDetailInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConferenceService {
    private final RedisUtil redisUtil;

    /**
     회의 진행 정보 불러오기
     */
    public Conference retrieveConference(String sessionId) throws JsonProcessingException {
        Conference conference = redisUtil.getRedisValue(sessionId, Conference.class);
        if(conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 세션입니다.");
        }
        return conference;
    }

    /**
     redis에 회의 진행 정보를 등록한다.
     */
    public void createConference(String sessionId, InterviewRoomDetailInfo interviewRoomDetailInfo) throws JsonProcessingException {
        Conference conference = new Conference();

        conference.setInterviewRoomId(interviewRoomDetailInfo.getId());
        conference.setManagerId(interviewRoomDetailInfo.getManager().getId());
        conference.setParticipants(interviewRoomDetailInfo.getParticipants());

        redisUtil.setRedisValue(sessionId, conference);
    }

    /**
     redis에서 회의 진행 정보를 삭제 /
     mariaDB로 회의 정보 이관 및 최종 종료
     */
    public void deleteConference(String sessionId) {
        //TODO: MariaDB에 자료 이관 작업
        redisUtil.deleteData(sessionId);
    }

}
