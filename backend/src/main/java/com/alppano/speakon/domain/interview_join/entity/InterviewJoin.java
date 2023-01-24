package com.alppano.speakon.domain.interview_join.entity;

import com.alppano.speakon.domain.recording.entity.Recording;
import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.resume.entity.Resume;
import com.alppano.speakon.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"interview_room_id", "user_id"})
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
    @JoinColumn(name = "interview_room_id", nullable = false)
    private InterviewRoom interviewRoom;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 0 : 시작전
     * <br>
     * 1 : 완료
     */
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private int finished;

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

    public void setInterviewRoom(InterviewRoom interviewRoom) {
        if (this.interviewRoom != null) {
            this.interviewRoom.getInterviewJoins().remove(this);
        }

        this.interviewRoom = interviewRoom;
        this.interviewRoom.getInterviewJoins().add(this);
    }

}
