package com.alppano.speakon.domain.interview_join.dto;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * InterviewState 에서 사용됨
 */
@Data
@NoArgsConstructor
public class InterviewJoinUserInfo {
    private Long id;
    private String name;
    private Long interviewJoinId;
    private boolean finished;

    public InterviewJoinUserInfo(InterviewJoin interviewJoin) {
        this.id = interviewJoin.getUser().getId();
        this.name = interviewJoin.getUser().getName();
        this.interviewJoinId = interviewJoin.getId();
        this.finished = interviewJoin.getFinished() == 1 ? true : false;
    }
}
