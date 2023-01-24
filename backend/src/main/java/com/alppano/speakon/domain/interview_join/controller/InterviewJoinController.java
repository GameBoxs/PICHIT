package com.alppano.speakon.domain.interview_join.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinInfo;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinRequest;
import com.alppano.speakon.domain.interview_join.service.InterviewJoinService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "면접참여 관리")
@RestController
@RequiredArgsConstructor
public class InterviewJoinController {

    private final InterviewJoinService interviewJoinService;

    @Operation(summary = "면접참여 등록")
    @PostMapping("/interviewjoins")
    public ResponseEntity<ApiResponse<InterviewJoinInfo>> createInterviewJoin(@AuthenticationPrincipal LoginUser loginUser,
                                                                              @RequestBody InterviewJoinRequest dto) {
        InterviewJoinInfo interviewJoinInfo = interviewJoinService.createInterviewJoin(dto, loginUser.getId());
        ApiResponse<InterviewJoinInfo> result = new ApiResponse<>(true, "면접참여 등록 성공", interviewJoinInfo);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }
}
