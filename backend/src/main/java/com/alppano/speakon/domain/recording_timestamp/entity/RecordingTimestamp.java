package com.alppano.speakon.domain.recording_timestamp.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.interview_recording.entity.InterviewRecording;
import com.alppano.speakon.domain.question.entity.Question;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecordingTimestamp extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "question_id", unique = true)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "interview_recording_id")
    private InterviewRecording interviewRecording;

    private Long secondTime;

}
