package com.alppano.speakon.domain.question.repository;

import com.alppano.speakon.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByInterviewJoinIdOrderByIdAsc(Long interviewJoinId);
}
