package com.alppano.speakon.domain.question.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.common.dto.PagedResult;
import com.alppano.speakon.domain.question.dto.QuestionInfo;
import com.alppano.speakon.domain.question.dto.QuestionRequest;
import com.alppano.speakon.domain.question.dto.QuestionWithFeedback;
import com.alppano.speakon.domain.question.service.QuestionService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "질문 관리")
@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @Operation(summary = "질문 생성")
    @PostMapping("/questions")
    public ResponseEntity<ApiResponse<QuestionInfo>> createQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                                    @RequestBody QuestionRequest dto) {
        QuestionInfo questionInfo = questionService.createQuestion(dto, loginUser.getId());
        ApiResponse<QuestionInfo> result = new ApiResponse<>(true, "질문 생성 성공", questionInfo);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "질문 내용 수정")
    @PutMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse<QuestionInfo>> createQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                                    @PathVariable Long questionId,
                                                                    @RequestBody QuestionRequest dto) {
        QuestionInfo questionInfo = questionService.updateQuestion(dto, questionId, loginUser.getId());
        ApiResponse result = new ApiResponse<>(true, "질문 수정 성공", questionInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "질문 삭제")
    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse> createQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                      @PathVariable Long questionId) {
        questionService.deleteQuestion(questionId, loginUser.getId());
        ApiResponse result = new ApiResponse<>(true, "질문 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "질문 단일 조회")
    @GetMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse<QuestionInfo>> getQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                                 @PathVariable Long questionId) {
        QuestionInfo questionInfo = questionService.getQuestion(questionId, loginUser.getId());
        ApiResponse<QuestionInfo> result = new ApiResponse<>(true, "질문 단일 조회 성공", questionInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접 참여자의 질문(+피드백) 목록 조회 (복기)")
    @GetMapping("/interviewjoins/{interviewJoinId}/questions-with-feedbacks")
    public ResponseEntity<ApiResponse<PagedResult<QuestionWithFeedback>>> getQuestionsWithFeedbackByInterviewJoin(@PageableDefault(size = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable,
                                                                                                      @AuthenticationPrincipal LoginUser loginUser,
                                                                                                      @PathVariable Long interviewJoinId) {
        PagedResult<QuestionWithFeedback> list = questionService.getQuestionListByInterviewJoin(pageable, interviewJoinId, loginUser.getId());
        ApiResponse<PagedResult<QuestionWithFeedback>> result = new ApiResponse<>(true, "질문 목록 조회 성공", list);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접 참여자의 질문 목록 조회 (면접방)")
    @GetMapping("/interviewjoins/{interviewJoinId}/questions")
    public ResponseEntity<ApiResponse<PagedResult<QuestionInfo>>> getQuestionsByInterviewJoin(@PageableDefault(size = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable,
                                                                                                                     @AuthenticationPrincipal LoginUser loginUser,
                                                                                                                     @PathVariable Long interviewJoinId) {
        PagedResult<QuestionInfo> list = questionService.getQuestionsByInterviewJoin(pageable, interviewJoinId, loginUser.getId());
        ApiResponse<PagedResult<QuestionInfo>> result = new ApiResponse<>(true, "질문 목록 조회 성공", list);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
