package com.alppano.speakon.domain.question.dto;

import com.alppano.speakon.domain.question.entity.Question;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class QuestionSimpleInfo {
    private Long questionId;
    private String content;

    public QuestionSimpleInfo(Question question) {
        this.questionId = question.getId();
        this.content = question.getContent();
    }
}
