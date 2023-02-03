package com.alppano.speakon.domain.recording_timestamp.dto;

import lombok.*;

@Data
@NoArgsConstructor
public class RecordingTimestampRequest {
    private Long id;
    private Long questionId;
    private Long recordingId;
    private int secondTime;
}
