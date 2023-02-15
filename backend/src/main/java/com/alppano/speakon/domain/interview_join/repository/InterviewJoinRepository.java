package com.alppano.speakon.domain.interview_join.repository;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InterviewJoinRepository extends JpaRepository<InterviewJoin, Long> {
    Optional<InterviewJoin> findByUserIdAndInterviewRoomId(Long userId, Long InterviewRoomId);

    @Query(value = "SELECT ij FROM InterviewJoin ij join ij.interviewRoom ir WHERE ij.user = :user and ir.finished=:finished")
    Page<InterviewJoin> findAllByFinishedAndUserId(Pageable pageable, @Param("finished") int finished, @Param("user") User user);

    Page<InterviewJoin> findAllByFinishedAndUserId(Pageable pageable, Integer finished, Long userId);

    Page<InterviewJoin> findAllByUserId(Pageable pageable, Long userId);

}
