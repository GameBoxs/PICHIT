package com.alppano.speakon.domain.interview_room.dto;

import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class InterviewRoomDetailInfo {

    private Long id;
    private String title;
    private String description;
    private int currentPersonCount;
    private int maxPersonCount;
    private boolean secretRoom;
    private boolean finished;
    private LocalDateTime startDate;
    private LocalDateTime createdDate;
    private UserInfoDto manager;
    private List<UserInfoDto> participants;

    public InterviewRoomDetailInfo(InterviewRoom dto) {
        this.id = dto.getId();
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.currentPersonCount = dto.getInterviewJoins().size();
        this.maxPersonCount = dto.getMaxPersonCount();
        this.secretRoom = dto.getPassword() == null ? false : true;
        this.finished = dto.getFinished() == 0 ? false : true;
        this.startDate = dto.getStartDate();
        this.createdDate = dto.getCreatedDate();
        this.manager = new UserInfoDto(dto.getManager());
    }

}
