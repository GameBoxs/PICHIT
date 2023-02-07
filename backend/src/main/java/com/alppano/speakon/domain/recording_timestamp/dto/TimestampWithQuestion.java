package com.alppano.speakon.domain.recording_timestamp.dto;

import com.alppano.speakon.domain.question.dto.QuestionSimpleInfo;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TimestampWithQuestion {
    private int secondTime;
    private QuestionSimpleInfo question;
}
