package com.alppano.speakon.domain.resume.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.resume.dto.ResumeInfo;
import com.alppano.speakon.domain.resume.service.ResumeService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "자기소개서 관리")
@RestController
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @Operation(summary = "자기소개서 등록")
    @PostMapping("/interviewjoins/{id}/resumes")
    public ResponseEntity<ApiResponse> resgisterResume(@AuthenticationPrincipal LoginUser loginUser,
                                                       @PathVariable("id") Long interviewJoinId,
                                                       @RequestParam("file") MultipartFile multipartFile) throws IOException {
        resumeService.registerResume(loginUser.getId(), interviewJoinId, multipartFile);
        ApiResponse result = new ApiResponse(true, "자기소개서 등록 성공");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "자기소개서 조회")
    @GetMapping("/interviewjoins/{id}/resumes")
    public ResponseEntity<ApiResponse<ResumeInfo>> getResume(@AuthenticationPrincipal LoginUser loginUser,
                                                             @PathVariable("id") Long interviewJoinId) {
        ResumeInfo resumeInfo = resumeService.getResume(loginUser.getId(), interviewJoinId);
        ApiResponse<ResumeInfo> result = new ApiResponse(true, "자기소개서 조회 성공", resumeInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "자기소개서 삭제")
    @DeleteMapping("/resumes/{id}")
    public ResponseEntity<ApiResponse<ResumeInfo>> deleteResume(@AuthenticationPrincipal LoginUser loginUser,
                                                                @PathVariable("id") Long resumeId) {
        resumeService.deleteResume(loginUser.getId(), resumeId);
        ApiResponse result = new ApiResponse(true, "자기소개서 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "자기소개서 수정")
    @PutMapping("/resumes/{id}")
    public ResponseEntity<ApiResponse<ResumeInfo>> deleteResume(@AuthenticationPrincipal LoginUser loginUser,
                                                                @PathVariable("id") Long resumeId,
                                                                @RequestParam("file") MultipartFile multipartFile) throws IOException {
        resumeService.updateResume(loginUser.getId(), resumeId, multipartFile);
        ApiResponse result = new ApiResponse(true, "자기소개서 수정 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
