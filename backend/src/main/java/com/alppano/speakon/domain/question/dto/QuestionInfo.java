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
    private boolean permission;
    private boolean finished;
    private UserInfoDto writer;

    public QuestionInfo(Question question, Long userId) {
        this.id = question.getId();
        this.content = question.getContent();
        this.interviewJoinId = question.getInterviewJoin().getId();
        this.permission = question.getWriter().getId().equals(userId) ? true : false;
        this.finished = question.getFinished() == 1 ? true : false;
        this.writer = new UserInfoDto(question.getWriter());
    }
}
