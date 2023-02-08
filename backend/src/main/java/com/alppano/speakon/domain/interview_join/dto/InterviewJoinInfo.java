package com.alppano.speakon.domain.interview_join.dto;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomSimpleInfo;
import lombok.*;

@Data
@NoArgsConstructor
public class InterviewJoinInfo {
    private Long interviewJoinId;
    private InterviewRoomSimpleInfo interviewRoom;
    private Long userId;
    private boolean finished;

    public InterviewJoinInfo(InterviewJoin interviewJoin) {
        this.interviewJoinId = interviewJoin.getId();
        this.interviewRoom = new InterviewRoomSimpleInfo(interviewJoin.getInterviewRoom());
        this.userId = interviewJoin.getUser().getId();
        this.finished = interviewJoin.getFinished() == 0 ? false : true;
    }
}
