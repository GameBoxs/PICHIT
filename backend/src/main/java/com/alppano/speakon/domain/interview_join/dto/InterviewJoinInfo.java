package com.alppano.speakon.domain.interview_join.dto;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomSimpleInfo;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.recording.entity.Recording;
import com.alppano.speakon.domain.resume.entity.Resume;
import com.alppano.speakon.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
