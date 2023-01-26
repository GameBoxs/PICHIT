package com.alppano.speakon.domain.question.dto;

import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionInfo {
    private Long id;
    private String content;
    private Long interviewJoinId;
    private UserInfoDto writer;

    public QuestionInfo(Question question) {
        this.id = question.getId();
        this.content = question.getContent();
        this.interviewJoinId = question.getInterviewJoin().getId();
        this.writer = new UserInfoDto(question.getWriter());
    }
}
