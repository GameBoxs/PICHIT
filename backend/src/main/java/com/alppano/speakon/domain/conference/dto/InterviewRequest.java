package com.alppano.speakon.domain.conference.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InterviewRequest {
    private String sessionId;
    private String intervieweeId;
    private String questionId;
}
