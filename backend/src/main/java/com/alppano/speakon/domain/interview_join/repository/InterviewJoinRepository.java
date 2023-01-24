package com.alppano.speakon.domain.interview_join.repository;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterviewJoinRepository extends JpaRepository<InterviewJoin, Long> {
    Optional<InterviewJoin> findByUserIdAndInterviewRoomId(Long userId, Long InterviewRoomId);
}
