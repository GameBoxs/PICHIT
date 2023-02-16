package com.alppano.speakon.domain.question.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionRequest {
    private String content;
    private Long interviewJoinId;
    private Long writerId;
}
