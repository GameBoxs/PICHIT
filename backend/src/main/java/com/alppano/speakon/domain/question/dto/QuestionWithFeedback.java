package com.alppano.speakon.domain.question.dto;

import com.alppano.speakon.domain.feedback.dto.FeedbackInfo;
import com.alppano.speakon.domain.feedback.entity.Feedback;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class QuestionWithFeedback {
    private Long id;
    private String content;
    private Long interviewJoinId;
    private UserInfoDto writer;
    private List<FeedbackInfo> feedbacks;

    public QuestionWithFeedback(Question question) {
        this.id = question.getId();
        this.content = question.getContent();
        this.interviewJoinId = question.getInterviewJoin().getId();
        this.writer = new UserInfoDto(question.getWriter());
        this.feedbacks = new ArrayList<>();
        for(Feedback feedback : question.getFeedbacks()) {
            this.feedbacks.add(new FeedbackInfo(feedback));
        }
    }
}
