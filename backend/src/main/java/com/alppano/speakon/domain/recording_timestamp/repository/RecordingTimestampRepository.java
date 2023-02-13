package com.alppano.speakon.domain.recording_timestamp.repository;

import com.alppano.speakon.domain.recording_timestamp.entity.RecordingTimestamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecordingTimestampRepository extends JpaRepository<RecordingTimestamp, Long> {
    Optional<RecordingTimestamp> findByQuestionId(Long questionId);
    List<RecordingTimestamp> findAllByInterviewRecordingIdOrderBySecondTimeAsc(Long interviewRecordingId);
}
