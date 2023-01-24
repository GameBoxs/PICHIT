package com.alppano.speakon.domain.interview_room.service;

import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomRequest;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_room.repository.InterviewRoomRepository;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InterviewRoomService {

    private final InterviewRoomRepository interviewRoomRepository;
    private final UserRepository userRepository;

    @Transactional
    public InterviewRoomInfo createInterviewRoom(InterviewRoomRequest dto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("회원"));

        InterviewRoom interviewRoom = InterviewRoom.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .manager(user)
                .maxPersonCount(dto.getMaxPersonCount())
                .password(dto.getPassword())
                .startDate(dto.getStartDate())
                .finished(0)
                .build();

        interviewRoomRepository.save(interviewRoom);

        return new InterviewRoomInfo(interviewRoom);
    }


}
