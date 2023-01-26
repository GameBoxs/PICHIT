package com.alppano.speakon.domain.feedback.dto;

import lombok.*;

@Data
@NoArgsConstructor
public class FeedbackRequest {
    private Long questionId;
    private int score;
    private String content;
}
