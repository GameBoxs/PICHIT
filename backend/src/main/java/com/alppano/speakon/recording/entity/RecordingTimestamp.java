package com.alppano.speakon.recording.entity;

import com.alppano.speakon.question.entity.Question;
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
    @JoinColumn(name = "question_id", nullable = false, unique = true)
    private Question question;

    @ManyToOne
    @JoinColumn(name = "recording_id")
    private Recording recording;

    private int secondTime;
}
