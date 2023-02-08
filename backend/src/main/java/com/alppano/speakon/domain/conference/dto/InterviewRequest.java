package com.alppano.speakon.domain.conference.dto;

import com.alppano.speakon.domain.question.dto.QuestionSimpleInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InterviewRequest {
    private Long interviewRoomId;
    private Long intervieweeId;
    private Long questionId;
    private String questionContent;
}
