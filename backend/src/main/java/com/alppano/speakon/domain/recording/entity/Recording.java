package com.alppano.speakon.domain.recording.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.recording_timestamp.entity.RecordingTimestamp;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Recording extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "interview_join_id", unique = true)
    private InterviewJoin interviewJoin;

    @OneToOne
    @JoinColumn(name = "data_file_id")
    private DataFile dataFile;

    @Builder.Default
    @OneToMany(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecordingTimestamp> recordingTimestamps = new ArrayList<>();

}
