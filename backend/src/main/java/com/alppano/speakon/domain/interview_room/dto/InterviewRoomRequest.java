package com.alppano.speakon.domain.interview_room.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InterviewRoomRequest {

    private String title;
    private String description;
    private int maxPersonCount;
    private String password;
    private int finished;
    private LocalDateTime startDate;
    private Long managerId;

}
