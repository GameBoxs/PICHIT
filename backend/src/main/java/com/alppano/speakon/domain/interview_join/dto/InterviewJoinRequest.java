package com.alppano.speakon.domain.interview_join.dto;

import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InterviewJoinRequest {
    private Long interviewRoomId;
    private String password;

}
