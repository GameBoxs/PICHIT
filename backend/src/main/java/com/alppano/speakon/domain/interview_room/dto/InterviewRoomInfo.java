package com.alppano.speakon.domain.interview_room.dto;

import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewRoomInfo {

    private Long id;
    private String title;
    // TODO: InterviewJoin 작업할 때 추가예정
//    private int currentPersonCount;
    private int maxPersonCount;
    private boolean secretRoom;
    private boolean finished;
    private LocalDateTime startDate;

    public InterviewRoomInfo(InterviewRoom dto) {
        this.id = dto.getId();
        this.title = dto.getTitle();
        this.maxPersonCount = dto.getMaxPersonCount();
        this.secretRoom = dto.getPassword() == null ? false : true;
        this.finished = dto.getFinished() == 0 ? false : true;
        this.startDate = dto.getStartDate();
    }

}
