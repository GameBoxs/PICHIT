package com.alppano.speakon.domain.conference.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InterviewRequest {
    private Long interviewRoomId;
    private Long intervieweeId;
    private Long questionId;
}
