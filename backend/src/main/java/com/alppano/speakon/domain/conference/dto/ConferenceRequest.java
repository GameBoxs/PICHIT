package com.alppano.speakon.domain.conference.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConferenceRequest {
    private String sessionId;
    private String intervieweeId;
    private String questionId;
}
