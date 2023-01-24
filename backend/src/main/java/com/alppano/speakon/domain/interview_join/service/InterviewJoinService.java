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
        // 이미 참여 중인 면접방인 경우
        if (interviewJoinRepository.findByUserIdAndInterviewRoomId(userId, dto.getInterviewRoomId()).isPresent()) {
            throw new ResourceAlreadyExistsException("해당 면접방에 이미 참여중 입니다.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("회원"));

        InterviewRoom interviewRoom = interviewRoomRepository.findById(dto.getInterviewRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        // 비밀방인 경우, 비밀번호 확인
        if (interviewRoom.getPassword() != null && !interviewRoom.getPassword().equals(dto.getPassword())) {
            throw new ResourceForbiddenException("비밀번호가 틀렸습니다.");
        }

        // 참여인원과 최대인원이 같은 경우
        if (interviewRoom.getInterviewJoins().size() == interviewRoom.getMaxPersonCount()) {
            throw new ResourceForbiddenException("해당 방의 인원이 꽉 찼습니다.");
        }

        InterviewJoin interviewJoin = InterviewJoin.builder()
                .interviewRoom(interviewRoom)
                .user(user)
                .finished(0)
                .build();

        interviewJoinRepository.save(interviewJoin);

        return new InterviewJoinInfo(interviewJoin);
    }

    @Transactional
    public void deleteInterviewJoin(Long interviewJoinId, Long userId) {
        InterviewJoin interviewJoin = interviewJoinRepository.findById(interviewJoinId)
                .orElseThrow(() -> new ResourceNotFoundException("참여 중인 면접방이 아닙니다."));

        // 참여 취소하려는 면접참여 정보가 본인이 참여 중인 정보인지 확인
        if (interviewJoin.getUser().getId() == userId) {
            interviewJoinRepository.delete(interviewJoin);
        } else {
            throw new ResourceForbiddenException("본인이 참여 중인 면접방만 참여 취소를 할 수 있습니다.");
        }
    }

}
