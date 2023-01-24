package com.alppano.speakon.domain.interview_room.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRoom extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 30, nullable = false)
    private String title;

    @Column(length = 300)
    private String description;

    @Column(nullable = false)
    private int maxPersonCount;

    @Column(length = 20)
    private String password;

    /**
     * 0 : 시작전
     * <br>
     * 1 : 완료
     */
    @Column(columnDefinition = "TINYINT(1)", nullable = false)
    private int finished;

    private LocalDateTime startDate;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Builder.Default
    @OneToMany(mappedBy = "interview", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterviewJoin> interviewJoins = new ArrayList<>();

    // TODO: 방장 위임에 대한 로직 처리가 필요함
    public void setManager(User manager) {
        if (this.manager != null) {
            this.manager.getInterviews().remove(this);
        }

        this.manager = manager;
        this.manager.getInterviews().add(this);
    }
}
