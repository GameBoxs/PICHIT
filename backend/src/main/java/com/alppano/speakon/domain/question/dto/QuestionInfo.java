package com.alppano.speakon.domain.question.dto;

import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import com.alppano.speakon.security.LoginUser;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuestionInfo {
    private Long id;
    private String content;
    private Long interviewJoinId;
    private UserInfoDto writer;
    private boolean permission;

    public QuestionInfo(Question question, Long userId) {
        this.id = question.getId();
        this.content = question.getContent();
        this.interviewJoinId = question.getInterviewJoin().getId();
        this.writer = new UserInfoDto(question.getWriter());
        this.permission = this.writer.getId().equals(userId) ? true : false;
    }
}
