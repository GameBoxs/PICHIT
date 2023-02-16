package com.alppano.speakon.domain.interview_join.entity;

import com.alppano.speakon.domain.user.dto.UserInfoDto;
import com.alppano.speakon.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Participant extends UserInfoDto {
    private Long interviewJoinId;
    private boolean finished;

    public Participant(InterviewJoin interviewJoin) {
        super(interviewJoin.getUser());
        this.interviewJoinId = interviewJoin.getId();
        this.finished = interviewJoin.getFinished() == 1 ? true : false;
    }
}
