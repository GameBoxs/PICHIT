package com.alppano.speakon.domain.interview_recording.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.interview_recording.dto.InterviewRecordingDetailInfo;
import com.alppano.speakon.domain.interview_recording.service.InterviewRecordingService;
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

@Tag(name = "면접 녹음 관리")
@RestController
@RequiredArgsConstructor
public class InterviewRecordingController {

    private final InterviewRecordingService recordingService;

    @Operation(summary = "면접 녹음 등록")
    @PostMapping("/interviewjoins/{interviewJoinId}/recordings")
    public ResponseEntity<ApiResponse> registerInterviewRecording(@AuthenticationPrincipal LoginUser loginUser,
                                                         @PathVariable Long interviewJoinId,
                                                         @RequestParam("file") MultipartFile multipartFile) throws IOException {
        recordingService.registerInterviewRecording(loginUser.getId(), interviewJoinId, multipartFile);
        ApiResponse result = new ApiResponse(true, "면접 녹음 등록 성공");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "면접 녹음 삭제")
    @DeleteMapping("/recordings/{recordingId}")
    public ResponseEntity<ApiResponse> deleteInterviewRecording(@AuthenticationPrincipal LoginUser loginUser,
                                                       @PathVariable Long recordingId) {
        recordingService.deleteInterviewRecording(loginUser.getId(), recordingId);
        ApiResponse result = new ApiResponse(true, "면접 녹음 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접 녹음(+타임스탬프) 조회")
    @GetMapping("/interviewjoins/{interviewJoinId}/recordings")
    public ResponseEntity<ApiResponse<InterviewRecordingDetailInfo>> getInterviewRecordingByInterviewJoin(@AuthenticationPrincipal LoginUser loginUser,
                                                                                        @PathVariable Long interviewJoinId) {
        InterviewRecordingDetailInfo info = recordingService.getInterviewRecordingByInterviewJoin(interviewJoinId, loginUser.getId());
        ApiResponse result = new ApiResponse(true, "면접 녹음 조회 성공", info);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
