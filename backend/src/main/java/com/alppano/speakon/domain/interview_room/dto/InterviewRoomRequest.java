package com.alppano.speakon.domain.interview_room.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewRoomRequest {

    private String title;
    private String description;
    private String contactWay;
    private Integer maxPersonCount;
    private String password;
    private Integer finished;
    private LocalDateTime startDate;
    private Long managerId;

}
