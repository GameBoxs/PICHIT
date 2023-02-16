package com.alppano.speakon.domain.conference.dto;

import com.alppano.speakon.domain.interview_join.entity.Participant;
import com.alppano.speakon.domain.question.dto.QuestionSimpleInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class InterviewState {

    Participant currentInterviewee;

    QuestionSimpleInfo questionProceeding;

    List<Participant> participants;

    public InterviewState(Conference conference) {
        this.currentInterviewee = conference.getCurrentInterviewee();
        this.questionProceeding = conference.getQuestionProceeding();
        this.participants = conference.getParticipants();
    }

}
