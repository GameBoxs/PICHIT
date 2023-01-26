package com.alppano.speakon.domain.question.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.question.dto.QuestionInfo;
import com.alppano.speakon.domain.question.dto.QuestionRequest;
import com.alppano.speakon.domain.question.service.QuestionService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "질문 삭제")
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<ApiResponse> createQuestion(@AuthenticationPrincipal LoginUser loginUser,
                                                      @PathVariable("id") Long questionId) {
        questionService.deleteQuestion(questionId, loginUser.getId());
        ApiResponse result = new ApiResponse<>(true, "질문 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
