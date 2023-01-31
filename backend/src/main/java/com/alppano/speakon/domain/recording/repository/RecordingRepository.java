package com.alppano.speakon.domain.recording.repository;

import com.alppano.speakon.domain.recording.entity.Recording;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordingRepository extends JpaRepository<Recording, Long> {
    Optional<Recording> findByInterviewJoinId(Long id);
}
