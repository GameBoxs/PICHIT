package com.alppano.speakon.domain.recording_timestamp.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.question.repository.QuestionRepository;
import com.alppano.speakon.domain.recording.entity.Recording;
import com.alppano.speakon.domain.recording.repository.RecordingRepository;
import com.alppano.speakon.domain.recording_timestamp.dto.RecordingTimestampRequest;
import com.alppano.speakon.domain.recording_timestamp.entity.RecordingTimestamp;
import com.alppano.speakon.domain.recording_timestamp.repository.RecordingTimestampRepository;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecordingTimestampService {

    private final RecordingTimestampRepository recordingTimestampRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final RecordingRepository recordingRepository;

    // TODO: 추후 수정 예정
    @Transactional
    public void createRecordingTimestamp(RecordingTimestampRequest dto) {
        Question question = questionRepository.findById(dto.getQuestionId()).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 질문 입니다.")
        );

        Recording recording = recordingRepository.findById(dto.getRecordingId()).orElseThrow(
                () -> new ResourceNotFoundException("면접 녹음파일이 존재하지 않습니다.")
        );

        if (recordingTimestampRepository.findByQuestionId(dto.getQuestionId()).isPresent()) {
            throw new ResourceAlreadyExistsException("해당 질문에 이미 타임스탬프가 존재합니다.");
        }

        RecordingTimestamp recordingTimestamp = RecordingTimestamp.builder()
                .recording(recording)
                .question(question)
                .secondTime(dto.getSecondTime())
                .build();

        recordingTimestampRepository.save(recordingTimestamp);
    }

    @Transactional
    public void deleteRecordingTimestamp(Long timestampId) {
        RecordingTimestamp recordingTimestamp = recordingTimestampRepository.findById(timestampId).orElseThrow(
                () -> new ResourceNotFoundException("해당 타임스탬프가 존재하지 않습니다.")
        );

        recordingTimestampRepository.delete(recordingTimestamp);
    }
}
