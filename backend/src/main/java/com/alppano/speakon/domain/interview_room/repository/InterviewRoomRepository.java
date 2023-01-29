package com.alppano.speakon.domain.interview_room.repository;

import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRoomRepository extends JpaRepository<InterviewRoom, Long> {
    Page<InterviewRoom> findAllByTitleContainingAndFinished(Pageable pageable, String title, int finished);
    Page<InterviewRoom> findAllByTitleContaining(Pageable pageable, String title);
    Page<InterviewRoom> findAllByFinished(Pageable pageable, int finished);
    Page<InterviewRoom> findAll(Pageable pageable);
}
