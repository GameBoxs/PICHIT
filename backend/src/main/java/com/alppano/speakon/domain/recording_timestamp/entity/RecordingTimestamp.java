package com.alppano.speakon.domain.recording_timestamp.entity;

import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.recording.entity.Recording;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecordingTimestamp {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "question_id", unique = true)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "recording_id")
    private Recording recording;

    private int secondTime;

}
