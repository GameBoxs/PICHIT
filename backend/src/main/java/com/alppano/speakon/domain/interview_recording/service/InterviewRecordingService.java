package com.alppano.speakon.domain.interview_recording.service;

import com.alppano.speakon.common.exception.BadRequestException;
import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.question.dto.QuestionSimpleInfo;
import com.alppano.speakon.domain.interview_recording.dto.InterviewRecordingDetailInfo;
import com.alppano.speakon.domain.interview_recording.entity.InterviewRecording;
import com.alppano.speakon.domain.interview_recording.repository.InterviewRecordingRepository;
import com.alppano.speakon.domain.recording_timestamp.dto.TimestampWithQuestion;
import com.alppano.speakon.domain.recording_timestamp.entity.RecordingTimestamp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InterviewRecordingService {

    private final InterviewRecordingRepository recordingRepository;
    private final DataFileRepository dataFileRepository;
    private final InterviewJoinRepository interviewJoinRepository;
    private final DataFileUtil dataFileUtil;

    @Transactional
    public void registerInterviewRecording(Long userId, Long interviewJoinId, MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new BadRequestException("요청에 녹음파일이 존재하지 않습니다.");
        }

        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId).orElseThrow(
                () -> new ResourceNotFoundException("당신은 존재하지 않는 면접 참여자입니다.")
        );

        if (!interviewJoin.getUser().getId().equals(userId)) {
            throw new ResourceForbiddenException("다른 참여자의 면접 녹음은 등록할 수 없습니다.");
        }

        if (recordingRepository.findByInterviewJoinId(interviewJoinId).isPresent()) {
            throw new ResourceAlreadyExistsException("면접 녹음은 하나만 등록할 수 있습니다.");
        }

        DataFile dataFile = dataFileUtil.storeFile(multipartFile);

        dataFileRepository.save(dataFile);

        InterviewRecording recording = InterviewRecording.builder()
                .interviewJoin(interviewJoin)
                .dataFile(dataFile)
                .build();

        recordingRepository.save(recording);
    }

    @Transactional
    public void deleteInterviewRecording(Long userId, Long resumeId) {
        InterviewRecording recording = recordingRepository.findById(resumeId).orElseThrow(
                () -> new ResourceNotFoundException("등록된 면접 녹음이 없습니다.")
        );

        InterviewJoin interviewJoin = recording.getInterviewJoin();

        if (interviewJoin.getUser().getId() != userId) {
            throw new ResourceForbiddenException("자신의 면접 녹음만 삭제할 수 있습니다.");
        }

        dataFileUtil.deleteFile(dataFileUtil.getFullPath(recording.getDataFile().getStoredFileName()));
        interviewJoin.setInterviewRecording(null);
        recordingRepository.delete(recording);
        dataFileRepository.delete(recording.getDataFile());
    }

    public InterviewRecordingDetailInfo getInterviewRecordingByInterviewJoin(Long interviewJoinId, Long userId) {
        InterviewRecording recording = recordingRepository.findByInterviewJoinId(interviewJoinId).orElseThrow(
                () -> new ResourceNotFoundException("등록된 면접 녹음이 없습니다.")
        );

        if (!recording.getInterviewJoin().getUser().getId().equals(userId)) {
            throw new ResourceForbiddenException("자신의 면접 녹음만 조회할 수 있습니다.");
        }

        List<RecordingTimestamp> timestampList = recording.getRecordingTimestamps();

        List<TimestampWithQuestion> timestampWithQuestions = new ArrayList<>();

        for (RecordingTimestamp timestamp : timestampList) {
            TimestampWithQuestion temp = TimestampWithQuestion.builder()
                    .question(new QuestionSimpleInfo(timestamp.getQuestion()))
                    .secondTime(timestamp.getSecondTime())
                    .build();
            timestampWithQuestions.add(temp);
        }

        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/datafiles/")
                .path(Long.toString(recording.getDataFile().getId()))
                .toUriString();

        InterviewRecordingDetailInfo recordingDetailInfo = InterviewRecordingDetailInfo.builder()
                .recordingId(recording.getId())
                .recordingUri(uri)
                .timestamps(timestampWithQuestions)
                .build();

        return recordingDetailInfo;
    }
}
