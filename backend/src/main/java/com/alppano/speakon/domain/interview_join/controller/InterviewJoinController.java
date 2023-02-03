package com.alppano.speakon.domain.interview_join.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.common.dto.PagedResult;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinInfo;
import com.alppano.speakon.domain.interview_join.dto.InterviewJoinRequest;
import com.alppano.speakon.domain.interview_join.service.InterviewJoinService;
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

    @Operation(summary = "면접참여 취소")
    @DeleteMapping("/interviewjoins/{id}")
    public ResponseEntity<ApiResponse> createInterviewJoin(@AuthenticationPrincipal LoginUser loginUser,
                                                           @PathVariable(value = "id") Long interviewJoinId) {
        interviewJoinService.deleteInterviewJoin(interviewJoinId, loginUser.getId());
        ApiResponse<InterviewJoinInfo> result = new ApiResponse<>(true, "면접참여 취소 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "자신이 참여한 면접 목록 조회")
    @GetMapping("/my-interviewjoins")
    public ResponseEntity<ApiResponse<PagedResult<InterviewJoinInfo>>> getMyInterviewJoins(@AuthenticationPrincipal LoginUser loginUser,
                                                                                                 @PageableDefault(size = 9, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                                                                                 @RequestParam int finished) {
        PagedResult<InterviewJoinInfo> list = interviewJoinService.getMyInterviewJoins(pageable, finished, loginUser.getId());
        ApiResponse<PagedResult<InterviewJoinInfo>> result = new ApiResponse(Boolean.TRUE, "조회 성공", list);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
