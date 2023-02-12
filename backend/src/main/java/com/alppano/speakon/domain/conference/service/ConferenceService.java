package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.entity.Participant;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_room.repository.InterviewRoomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConferenceService {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    private final ObjectMapper objectMapper;
    private final HttpRequestService httpRequestService;
    private final RedisTemplate<String, Object> redisTemplate;
    private final InterviewRoomRepository interviewRoomRepository;
    private final InterviewJoinRepository interviewJoinRepository;

    @PostConstruct
    public void init() { // OPENVIDU 초기화
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public <T> T getRedisValue(String key, Class<T> classType) throws JsonProcessingException {
        String redisValue = (String) redisTemplate.opsForValue().get(key);
        return ObjectUtils.isEmpty(redisValue) ? null : objectMapper.readValue(redisValue, classType);
    }

    public void setRedisValue(String key, Object classType) throws JsonProcessingException {
        redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(classType));
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public boolean isSessionOpened(Long interviewRoomId) throws JsonProcessingException, OpenViduJavaClientException, OpenViduHttpException {
        String key = String.valueOf(interviewRoomId);
        Conference conference = getRedisValue(key, Conference.class);
        if(conference == null) {
            return false;
        }
        openvidu.fetch();
        Session session = openvidu.getActiveSession(conference.getSessionId());
        return session != null;
    }

    /**
     * openvidu 세션 시작 / redis 회의 정보 등록
     */
    public void createConference(Long requesterId, Long interviewRoomId)
            throws JsonProcessingException, OpenViduJavaClientException, OpenViduHttpException {
        // 세션 생성에 필요한 property -> null 전달 시 기본값
        SessionProperties properties = SessionProperties.fromJson(null).build();

        InterviewRoom interviewRoom = interviewRoomRepository.findById(interviewRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        if (!interviewRoom.getManager().getId().equals(requesterId)) {
            throw new ResourceForbiddenException("세션을 생성할 권한이 없습니다.");
        }

        Conference conference = getRedisValue(String.valueOf(interviewRoomId), Conference.class);
        if(conference != null) { // 이미 Redis에 회의 진행 정보가 존재함
            openvidu.fetch(); // OpenVidu로 부터 세션 목록 fetch & UPDATE
            if(openvidu.getActiveSession(conference.getSessionId()) == null) { // 근데 OpenVidu Session이 죽어있음
                // 세션을 새로 만들고 Redis 값 갱신
                Session session = openvidu.createSession(properties);
                conference.setSessionId(session.getSessionId());
                setRedisValue(String.valueOf(interviewRoomId), conference);
                return;
            } else { // OpenVidu Session이 살아있다.
                throw new ResourceAlreadyExistsException("이미 생성된 회의입니다.");
            }
        }
        Session session = openvidu.createSession(properties);

        List<Participant> participants = new ArrayList<>();
        for (InterviewJoin join : interviewRoom.getInterviewJoins()) {
            participants.add(new Participant(join));
        }

        conference = new Conference();
        conference.setSessionId(session.getSessionId());
        conference.setManagerId(requesterId);
        conference.setParticipants(participants);
        setRedisValue(String.valueOf(interviewRoomId), conference);
    }

    /**
     * redis 회의 정보 제거 + openvidu 세션 제거 /
     * mariaDB로 회의 정보 이관 및 최종 종료
     */
    @Transactional
    public void closeConference(Long requesterId, Long interviewRoomId) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        //TODO: MariaDB에 자료 이관 작업
        InterviewRoom interviewRoom = interviewRoomRepository.findById(interviewRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        if (!interviewRoom.getManager().getId().equals(requesterId)) {
            throw new ResourceForbiddenException("세션을 종료할 권한이 없습니다.");
        }

        Conference conference = getRedisValue(String.valueOf(interviewRoomId), Conference.class);
        if (conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 회의입니다.");
        }
        deleteData(String.valueOf(interviewRoomId));
        httpRequestService.broadCastSignal(conference.getSessionId(), "session-closed", "goodbye");

        interviewRoom.setFinished(1);

        openvidu.fetch();
        Session session = openvidu.getActiveSession(conference.getSessionId());
        if(session != null) {
            session.close();
        }

    }

    /**
     * 세션 연결을 위한 Token 발급
     */
    public String getSessionToken(Long requesterId, Long interviewRoomId) throws OpenViduJavaClientException, OpenViduHttpException, JsonProcessingException {
        interviewRoomRepository.findById(interviewRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, interviewRoomId)
                .orElseThrow(() -> new ResourceForbiddenException("참여 중인 면접방만 접근할 수 있습니다."));

        Conference conference = getRedisValue(String.valueOf(interviewRoomId), Conference.class);
        if (conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 회의입니다.");
        }

        openvidu.fetch();
        Session session = openvidu.getActiveSession(conference.getSessionId());
        if (session == null) {
            throw new ResourceNotFoundException("존재하지 않는 세션입니다.");
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(null).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }

}
