package com.alppano.speakon.domain.interview_join.dto;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomSimpleInfo;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewJoinInfo {
    private Long interviewJoinId;
    private Long userId;
    private boolean finished;
    private LocalDateTime startedTime;
    private InterviewRoomSimpleInfo interviewRoom;

    public InterviewJoinInfo(InterviewJoin interviewJoin) {
        this.interviewJoinId = interviewJoin.getId();
        this.userId = interviewJoin.getUser().getId();
        this.finished = interviewJoin.getFinished() == 0 ? false : true;
        this.startedTime = interviewJoin.getStartedTime();
        this.interviewRoom = new InterviewRoomSimpleInfo(interviewJoin.getInterviewRoom());
    }
}
