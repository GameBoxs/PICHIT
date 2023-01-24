package com.alppano.speakon.domain.interview_room.service;

import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.interview_join.entity.InterviewJoin;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomDetailInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomRequest;
import com.alppano.speakon.domain.interview_room.entity.InterviewRoom;
import com.alppano.speakon.domain.interview_room.repository.InterviewRoomRepository;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InterviewRoomService {

    private final InterviewRoomRepository interviewRoomRepository;
    private final InterviewJoinRepository interviewJoinRepository;
    private final UserRepository userRepository;

    @Transactional
    public InterviewRoomInfo createInterviewRoom(InterviewRoomRequest dto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 회원입니다."));

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

        InterviewJoin interviewJoin = InterviewJoin.builder()
                .user(user)
                .finished(0)
                .build();

        // TODO: 면접방 생성 후, 응답 데이터로 현재 인원 정보를 줄 필요가 없다면 builder로 생성할 때 interviewRoom을 같이 넣어주면 됨
        interviewJoin.setInterviewRoom(interviewRoom);

        interviewJoinRepository.save(interviewJoin);

        return new InterviewRoomInfo(interviewRoom);
    }

    public InterviewRoomDetailInfo getInterviewRoomDetailInfo(Long interviewRoomId, Long userId) {
        InterviewRoom interviewRoom = interviewRoomRepository.findById(interviewRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 면접방입니다."));

        interviewJoinRepository.findByUserIdAndInterviewRoomId(userId, interviewRoomId)
                .orElseThrow(() -> new ResourceForbiddenException("참여 중인 면접방만 접근할 수 있습니다."));

        InterviewRoomDetailInfo interviewRoomDetailInfo = new InterviewRoomDetailInfo(interviewRoom);

        // 참가자 정보
        List<UserInfoDto> participants = new ArrayList<>();
        for (InterviewJoin join : interviewRoom.getInterviewJoins()) {
            participants.add(new UserInfoDto(join.getUser()));
        }
        interviewRoomDetailInfo.setParticipants(participants);

        return interviewRoomDetailInfo;
    }


}
