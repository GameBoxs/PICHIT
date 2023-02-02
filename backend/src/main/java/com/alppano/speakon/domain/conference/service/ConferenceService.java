package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.RedisUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.entity.Participant;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_room.repository.InterviewRoomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConferenceService {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private final RedisUtil redisUtil;
    private final InterviewRoomRepository interviewRoomRepository;
    private OpenVidu openvidu;

    @PostConstruct
    public void init() { // OPENVIDU 초기화
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

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
     openvidu 세션 시작 / redis 회의 정보 등록
     */
      public void createConference(Long requesterId, Long interviewRoomId)
              throws JsonProcessingException, OpenViduJavaClientException, OpenViduHttpException {
          InterviewRoom interviewRoom = interviewRoomRepository.findById(interviewRoomId)
                  .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

          if(!interviewRoom.getManager().getId().equals(requesterId)) {
              throw new ResourceForbiddenException("세션을 생성할 권한이 없습니다.");
          }

          // 세션 생성에 필요한 property -> null 전달 시 기본값
          SessionProperties properties = SessionProperties.fromJson(null).build();
          Session session = openvidu.createSession(properties);
          if (session == null) {
              throw new ResourceNotFoundException("세션 생성 실패");
          }

          List<Participant> participants = new ArrayList<>();
          for (InterviewJoin join : interviewRoom.getInterviewJoins()) {
              participants.add(new Participant(join.getUser(), join.getId()));
          }

          Conference conference = new Conference();
          conference.setSessionId(session.getSessionId());
          conference.setManagerId(requesterId);
          conference.setParticipants(participants);
          redisUtil.setRedisValue(String.valueOf(interviewRoomId), conference);
      }

    /**
     redis 회의 정보 제거 + openvidu 세션 제거 /
     mariaDB로 회의 정보 이관 및 최종 종료
     */
    public void closeConference(Long requesterId, Long interviewRoomId) throws JsonProcessingException, OpenViduJavaClientException, OpenViduHttpException {
        //TODO: MariaDB에 자료 이관 작업
        InterviewRoom interviewRoom = interviewRoomRepository.findById(interviewRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        if(!interviewRoom.getManager().getId().equals(requesterId)) {
            throw new ResourceForbiddenException("세션을 종료할 권한이 없습니다.");
        }

        Conference conference = redisUtil.getRedisValue(String.valueOf(interviewRoomId), Conference.class);
        if(conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 세션입니다.");
        }

        Session session = openvidu.getActiveSession(conference.getSessionId());
        session.close();

        redisUtil.deleteData(String.valueOf(interviewRoomId));
    }

    public String getOpenviduToken(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            throw new ResourceNotFoundException("존재하지 않는 세션입니다.");
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(null).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }

}
