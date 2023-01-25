package com.alppano.speakon.domain.user.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.feedback.entity.Feedback;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 사용자 Entity
 */
@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * provider + "_" + provider_id
     */
    @Column(length = 100, nullable = false, unique = true)
    private String userId;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50)
    private String email;

    @Column(length = 30, nullable = false)
    private String provider;

    @Builder.Default
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterviewJoin> interviewJoins = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    private List<Question> questions = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    private List<Feedback> feedbacks = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private List<InterviewRoom> interviewRooms = new ArrayList<>();

    // TODO: 테이블에 직접 ON DELETE 설정 고려

    /**
     * user 엔티티 삭제 직전에, 일부 테이블의 user를 참고하고 있던 칼럼 값을 null로 변경
     * <br>
     * ( 면접방, 질문, 피드백 ) 테이블의 row에 적용
     */
    @PreRemove
    public void onDeleteSetNull() {

        for (int i = interviewRooms.size() - 1; i >= 0; i--) {
            // TODO: 방장 위임에 대한 로직 처리가 필요함
            interviewRooms.get(i).setManager(null);
        }

        // TODO: 질문 및 피드백 기능 구현 시 수정
//        for (Question question : questions) {
//            question.setWriter(null);
//        }
//
//        for (Feedback feedback : feedbacks) {
//            feedback.setWriter(null);
//        }
    }
}
