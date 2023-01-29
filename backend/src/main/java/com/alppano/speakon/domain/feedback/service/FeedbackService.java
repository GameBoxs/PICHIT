package com.alppano.speakon.domain.feedback.service;

import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.feedback.dto.FeedbackInfo;
import com.alppano.speakon.domain.feedback.dto.FeedbackRequest;
import com.alppano.speakon.domain.feedback.entity.Feedback;
import com.alppano.speakon.domain.feedback.repository.FeedbackRepository;
import com.alppano.speakon.domain.interview_join.repository.InterviewJoinRepository;
import com.alppano.speakon.domain.question.entity.Question;
import com.alppano.speakon.domain.question.repository.QuestionRepository;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final InterviewJoinRepository interviewJoinRepository;

    @Transactional
    public FeedbackInfo createFeedback(FeedbackRequest dto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 회원입니다.")
        );

        Question question = questionRepository.findById(dto.getQuestionId()).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 질문입니다.")
        );

        Long interviewRoomId = question.getInterviewJoin().getInterviewRoom().getId();
        if (interviewJoinRepository.findByUserIdAndInterviewRoomId(userId, interviewRoomId).isEmpty()) {
            throw new ResourceForbiddenException("면접방에 참여한 사람만 피드백을 작성할 수 있습니다.");
        }

        // 피드백이 이미 존재하는 경우
        if (feedbackRepository.findByWriterIdAndQuestionId(userId, question.getId()).isPresent()) {
            throw new ResourceAlreadyExistsException("한 질문에 하나의 피드백만 작성할 수 있습니다.");
        }

        Feedback feedback = Feedback.builder()
                .question(question)
                .score(dto.getScore())
                .content(dto.getContent())
                .writer(user)
                .build();

        feedbackRepository.save(feedback);

        return new FeedbackInfo(feedback);
    }

    @Transactional
    public void deleteFeedback(Long feedbackId, Long userId) {
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow(
                ()-> new ResourceNotFoundException("존재하지 않는 피드백입니다.")
        );

        if(feedback.getWriter().getId() != userId) {
            throw new ResourceForbiddenException("자신이 작성한 피드백만 삭제할 수 있습니다.");
        }

        feedbackRepository.delete(feedback);
    }
}
