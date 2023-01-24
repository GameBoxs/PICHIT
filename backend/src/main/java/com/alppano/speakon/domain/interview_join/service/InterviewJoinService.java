package com.alppano.speakon.domain.interview_join.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinInfo;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinRequest;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_room.repository.InterviewRoomRepository;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InterviewJoinService {

    private final InterviewRoomRepository interviewRoomRepository;
    private final InterviewJoinRepository interviewJoinRepository;
    private final UserRepository userRepository;

    @Transactional
    public InterviewJoinInfo createInterviewJoin(InterviewJoinRequest dto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("회원"));

        InterviewRoom interviewRoom = interviewRoomRepository.findById(dto.getInterviewRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("면접방"));

        // 비밀방인 경우, 비밀번호 확인
        if (interviewRoom.getPassword() != null && !interviewRoom.getPassword().equals(dto.getPassword())) {
            throw new ResourceForbiddenException("비밀번호가 틀렸습니다.");
        }

        InterviewJoin interviewJoin = InterviewJoin.builder()
                .interviewRoom(interviewRoom)
                .user(user)
                .finished(0)
                .build();

        try {
            interviewJoinRepository.saveAndFlush(interviewJoin);
        } catch (DataIntegrityViolationException e) {
            throw new ResourceAlreadyExistsException("해당 면접방에 이미 참여중 입니다.");
        }

        return new InterviewJoinInfo(interviewJoin);
    }

}
