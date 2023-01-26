package com.alppano.speakon.domain.feedback.repository;

import com.alppano.speakon.domain.feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByWriterIdAndQuestionId(Long userId, Long questionId);

}
