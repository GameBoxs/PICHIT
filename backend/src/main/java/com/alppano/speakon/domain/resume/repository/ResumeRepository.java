package com.alppano.speakon.domain.resume.repository;

import com.alppano.speakon.domain.resume.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByInterviewJoinId(Long interviewJoinId);
}
