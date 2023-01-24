package com.alppano.speakon.domain.interview_room.dto;

import com.alppano.speakon.domain.user.dto.UserInfoDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewRoomDetailInfo {

    private Long id;
    private String title;
    private String description;
    // TODO: InterviewJoin 작업할 때 추가예정
//    private int currentPersonCount;
    private int maxPersonCount;
    private boolean secretRoom;
    private boolean finished;
    private LocalDateTime startDate;
    private LocalDateTime createdDate;
    private UserInfoDto manager;
    
}
