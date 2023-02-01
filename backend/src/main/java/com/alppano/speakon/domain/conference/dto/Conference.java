package com.alppano.speakon.domain.conference.dto;

import com.alppano.speakon.domain.interview_join.entity.Participant;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Conference {
    private Long interviewRoomId;
    private Long managerId;
    private List<Participant> participants;
    private String questionProceeding;
    private String currentInterviewee;
}
