package com.alppano.speakon.domain.feedback.dto;

import com.alppano.speakon.domain.feedback.entity.Feedback;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedbackInfo {
    private Long id;
    private Long questionId;
    private int score;
    private String content;
    private UserInfoDto writer;

    public FeedbackInfo(Feedback feedback) {
        this.id = feedback.getId();
        this.questionId = feedback.getQuestion().getId();
        this.score = feedback.getScore();
        this.content = feedback.getContent();
        this.writer = new UserInfoDto(feedback.getWriter());
    }
}
