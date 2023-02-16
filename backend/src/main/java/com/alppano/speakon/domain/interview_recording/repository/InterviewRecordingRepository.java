package com.alppano.speakon.domain.interview_recording.repository;

import com.alppano.speakon.domain.interview_recording.entity.InterviewRecording;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterviewRecordingRepository extends JpaRepository<InterviewRecording, Long> {
    Optional<InterviewRecording> findByInterviewJoinId(Long id);
}
