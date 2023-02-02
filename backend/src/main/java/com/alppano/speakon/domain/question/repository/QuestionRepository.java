package com.alppano.speakon.domain.question.repository;

import com.alppano.speakon.domain.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByInterviewJoinId(Pageable pageable, Long interviewJoinId);
}
