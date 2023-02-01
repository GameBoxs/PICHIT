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
    public Conference retrieveConference(Long interviewRoomId) throws JsonProcessingException {
        String key = String.valueOf(interviewRoomId);
        Conference conference = redisUtil.getRedisValue(key , Conference.class);
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

        conference.setSessionId(sessionId);
        conference.setManagerId(interviewRoomDetailInfo.getManager().getId());
        conference.setParticipants(interviewRoomDetailInfo.getParticipants());

        redisUtil.setRedisValue(String.valueOf(interviewRoomDetailInfo.getId()), conference);
    }

    /**
     redis에서 회의 진행 정보를 삭제 /
     mariaDB로 회의 정보 이관 및 최종 종료
     */
    public void deleteConference(Long interviewRoomId) {
        String key = String.valueOf(interviewRoomId);
        //TODO: MariaDB에 자료 이관 작업
        redisUtil.deleteData(key);
    }

}
