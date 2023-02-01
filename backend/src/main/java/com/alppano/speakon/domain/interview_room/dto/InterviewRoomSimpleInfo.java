package com.alppano.speakon.domain.interview_room.dto;

import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewRoomSimpleInfo {

    private Long interviewRoomId;
    private String title;
    private boolean finished;
    private LocalDateTime startDate;

    public InterviewRoomSimpleInfo(InterviewRoom dto) {
        this.interviewRoomId = dto.getId();
        this.title = dto.getTitle();
        this.finished = dto.getFinished() == 0 ? false : true;
        this.startDate = dto.getStartDate();
    }

}
