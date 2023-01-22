package com.alppano.speakon.interview.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.question.entity.Question;
import com.alppano.speakon.recording.entity.Recording;
import com.alppano.speakon.resume.entity.Resume;
import com.alppano.speakon.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"interview_id", "user_id"})
})
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewJoin extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 0 : 시작전
     * <br>
     * 1 : 완료
     */
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private int finish;

    @OneToOne(mappedBy = "interviewJoin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Recording recording;

    @OneToOne(mappedBy = "interviewJoin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Resume resume;

    @Builder.Default
    @OneToMany(mappedBy = "interviewJoin", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    public void setUser(User user) {
        if (this.user != null) {
            this.user.getInterviewJoins().remove(this);
        }

        this.user = user;
        this.user.getInterviewJoins().add(this);
    }

    public void setInterview(Interview interview) {
        if (this.interview != null) {
            this.interview.getInterviewJoins().remove(this);
        }

        this.interview = interview;
        this.interview.getInterviewJoins().add(this);
    }

}
