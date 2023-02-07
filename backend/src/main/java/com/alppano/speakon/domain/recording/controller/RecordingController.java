package com.alppano.speakon.domain.recording.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.recording.dto.RecordingDetailInfo;
import com.alppano.speakon.domain.recording.service.RecordingService;
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
public class RecordingController {

    private final RecordingService recordingService;

    @Operation(summary = "면접 녹음 등록")
    @PostMapping("/interviewjoins/{interviewJoinId}/recordings")
    public ResponseEntity<ApiResponse> registerRecording(@AuthenticationPrincipal LoginUser loginUser,
                                                         @PathVariable Long interviewJoinId,
                                                         @RequestParam("file") MultipartFile multipartFile) throws IOException {
        recordingService.registerRecording(loginUser.getId(), interviewJoinId, multipartFile);
        ApiResponse result = new ApiResponse(true, "면접 녹음 등록 성공");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "면접 녹음 삭제")
    @DeleteMapping("/recordings/{recordingId}")
    public ResponseEntity<ApiResponse> deleteRecording(@AuthenticationPrincipal LoginUser loginUser,
                                                       @PathVariable Long recordingId) {
        recordingService.deleteRecording(loginUser.getId(), recordingId);
        ApiResponse result = new ApiResponse(true, "면접 녹음 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접 녹음(+타임스탬프) 조회")
    @GetMapping("/interviewjoins/{interviewJoinId}/recordings")
    public ResponseEntity<ApiResponse<RecordingDetailInfo>> getRecordingByInterviewJoin(@AuthenticationPrincipal LoginUser loginUser,
                                                                                        @PathVariable Long interviewJoinId) {
        RecordingDetailInfo info = recordingService.getRecordingByInterviewJoin(interviewJoinId, loginUser.getId());
        ApiResponse result = new ApiResponse(true, "면접 녹음 조회 성공", info);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
