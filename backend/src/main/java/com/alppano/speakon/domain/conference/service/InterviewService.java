package com.alppano.speakon.domain.conference.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.conference.dto.Conference;
import com.alppano.speakon.domain.conference.dto.InterviewRequest;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.interview_recording.entity.InterviewRecording;
import com.alppano.speakon.domain.interview_recording.repository.InterviewRecordingRepository;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.question.repository.QuestionRepository;
import com.alppano.speakon.domain.recording_timestamp.entity.RecordingTimestamp;
import com.alppano.speakon.domain.recording_timestamp.repository.RecordingTimestampRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterviewService {

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    private final ObjectMapper objectMapper;
    private final QuestionRepository questionRepository;
    private final DataFileUtil dataFileUtil;
    private final HttpRequestService httpRequestService;
    private final RedisTemplate<String, Object> redisTemplate;
    private final InterviewJoinRepository interviewJoinRepository;
    private final InterviewRecordingRepository interviewRecordingRepository;
    private final RecordingTimestampRepository recordingTimestampRepository;
    private final DataFileRepository dataFileRepository;

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

    public Conference retrieveConference(Long interviewRoomId) throws JsonProcessingException {
        String key = String.valueOf(interviewRoomId);
        Conference conference = getRedisValue(key, Conference.class);
        if (conference == null) {
            throw new ResourceNotFoundException("존재하지 않는 회의입니다.");
        }
        return conference;
    }

    /*
        면접자를 지정합니다.
     */
    @Transactional
    public void selectInterviewee(Long requesterId, InterviewRequest req) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if (!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접자를 지정할 권한이 없습니다.");
        }
        if (conference.getCurrentInterviewee() != null) {
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
        setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

    @Transactional
    public void endInterview(Long requesterId, InterviewRequest req) throws IOException, OpenViduJavaClientException, OpenViduHttpException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        if (!conference.getManagerId().equals(requesterId)) {
            throw new ResourceForbiddenException("면접을 끝낼 권한이 없습니다.");
        }
        if (conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        InterviewJoin interviewJoin = interviewJoinRepository.findByUserIdAndInterviewRoomId(req.getIntervieweeId(), req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("미참여자를 지정하였습니다."));

        String signalData = objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-interview-end", signalData);

        openvidu.fetch();
        openvidu.stopRecording(conference.getRecordingId());

        // TODO: 리팩토링
        // Redis에 진행 중이던 면접자 삭제
        conference.setCurrentInterviewee(null);
        setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);

        interviewJoin.setFinished(1);

        // 파일 이동
        String fileName = req.getInterviewRoomId() + "_" + req.getIntervieweeId() + ".webm";
        DataFile dataFile = dataFileUtil.storeOpenViduRecordingFile(conference.getSessionId(), fileName);

        dataFileRepository.save(dataFile);

        // 면접 녹음 데이터 저장
        InterviewRecording interviewRecording = InterviewRecording.builder()
                .interviewJoin(interviewJoin)
                .dataFile(dataFile)
                .build();

        interviewRecordingRepository.save(interviewRecording);

        // 타임스탬프 일괄 처리
        List<Question> questions = questionRepository.findAllByInterviewJoinId(interviewJoin.getId());

        List<RecordingTimestamp> timestampList = new ArrayList<>();

        for (Question question : questions) {
            long secondTime = Duration.between(interviewJoin.getStartedTime(), question.getStartedTime()).getSeconds();

            RecordingTimestamp recordingTimestamp = RecordingTimestamp.builder()
                    .secondTime(secondTime)
                    .interviewRecording(interviewRecording)
                    .question(question)
                    .build();

            timestampList.add(recordingTimestamp);
        }

        recordingTimestampRepository.saveAll(timestampList);
    }

    /*
        질문 제안하기
        redis에 질문 저장 -> 세션에 질문 전파 -> 질문 시작 시간 기록
        @Transactional 어노테이션은 question의 시작 시간을 기록하기 위함(JPA)
        동시에 질문이 들어올 수 있으므로 redis sessionCallback을 사용하여 트랜잭션 적용
     */
    @Transactional
    public void proposeQuestion(Long requesterId, InterviewRequest req) throws IOException {
        redisTemplate.execute(new SessionCallback<>() {
            @SneakyThrows
            @Override
            public List<Object> execute(RedisOperations operations) {
                // watch를 통해 여러명이 동시 접근 하는지 optimistic lock으로 검사 가능
                operations.watch(String.valueOf(req.getInterviewRoomId()));
                // redis get은 multi 내부에서 null을 리턴하므로 꺼내놓음
                Conference conference = retrieveConference(req.getInterviewRoomId());
                operations.multi();
                // conference 검사
                interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, req.getInterviewRoomId())
                        .orElseThrow(() -> new ResourceForbiddenException("회의 참여자만 질문할 수 있습니다..."));
                questionRepository.findById(req.getQuestionId()).orElseThrow(
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
                // 제안할 질문을 set한다. (거의 동시에 요청이 들어와도 늦게 들어왔다면 discard된다)
                conference.setQuestionProceeding(req.getQuestionId());
                setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);

                return operations.exec();
            }
        });
        // 회의 정보를 redis로 부터 다시 불러옴
        Conference conference = retrieveConference(req.getInterviewRoomId());
        // 값이 변경 되지 않았다면? -> Redis Tx에서 set요청이 discard된 것
        if(!conference.getQuestionProceeding().equals(req.getQuestionId())){
            throw new ResourceForbiddenException("먼저 들어온 질문에 의해 요청이 거절되었습니다.");
        }
        Question question = questionRepository.findById(req.getQuestionId()).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 질문입니다...")
        );
        String signalData = objectMapper.writeValueAsString(req);

        // 질문이 제안 되었음을 session에 전파한다.
        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-start", signalData);
        // 질문 시작 시간을 기록
        question.setStartedTime(LocalDateTime.now());
    }

    /*
        현재 진행 중인 질문을 끝낸다.
     */
    public void endQuestion(Long requesterId, InterviewRequest req) throws IOException {
        Conference conference = retrieveConference(req.getInterviewRoomId());

        interviewJoinRepository.findByUserIdAndInterviewRoomId(requesterId, req.getInterviewRoomId())
                .orElseThrow(() -> new ResourceForbiddenException("회의 참여자만 질문할 수 있습니다..."));
        if (conference.getQuestionProceeding() == null) {
            throw new ResourceForbiddenException("질문이 진행 중이지 않습니다...");
        }
        if (conference.getCurrentInterviewee() == null) {
            throw new ResourceForbiddenException("진행 중인 면접자가 없습니다.");
        }
        if (!conference.getCurrentInterviewee().equals(req.getIntervieweeId())) {
            throw new ResourceForbiddenException("잘못된 면접자를 지정하였습니다...");
        }
        if (!conference.getQuestionProceeding().equals(req.getQuestionId())) {
            throw new ResourceForbiddenException("잘못된 질문을 지정하였습니다...");
        }

        String signalData= objectMapper.writeValueAsString(req);

        httpRequestService.broadCastSignal(conference.getSessionId(),
                "broadcast-question-end", signalData);

        // Redis에 질문이 끝났다고 UPDATE
        conference.setQuestionProceeding(null);
        setRedisValue(String.valueOf(req.getInterviewRoomId()), conference);
    }

}