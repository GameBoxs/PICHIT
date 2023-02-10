package com.alppano.speakon.domain.conference.dto;

import com.alppano.speakon.domain.interview_join.entity.Participant;
import com.alppano.speakon.domain.question.dto.QuestionSimpleInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Conference {
    private String sessionId;
    private Long managerId;
    private List<Participant> participants;
    private QuestionSimpleInfo questionProceeding; //    private Long questionProceeding;
    private Participant currentInterviewee; // private Long currentInterviewee;
    private String recordingId;

    public void setParticipantFinished(Long userId, boolean finished) {
        for (Participant participant : participants) {
            if (participant.getId().equals(userId)) {
                participant.setFinished(finished);
                return;
            }
        }
    }
}


//public class Conference {
//    private String sessionId;
//    private Long managerId;
//    private List<Participant> participants;
//    private Long questionProceeding;
//    private Long currentInterviewee;
//    private String recordingId;
//}
