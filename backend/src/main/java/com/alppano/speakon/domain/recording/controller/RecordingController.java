package com.alppano.speakon.domain.recording.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.recording.service.RecordingService;
import com.alppano.speakon.security.LoginUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "면접 녹음 관리")
@RestController
@RequiredArgsConstructor
public class RecordingController {

    private final RecordingService recordingService;

    @Operation(summary = "면접 녹음 등록")
    @PostMapping("/interviewjoins/{id}/recordings")
    public ResponseEntity<ApiResponse> registerRecording(@AuthenticationPrincipal LoginUser loginUser,
                                                       @PathVariable("id") Long interviewJoinId,
                                                       @RequestParam("file") MultipartFile multipartFile) throws IOException {
        recordingService.registerRecording(loginUser.getId(), interviewJoinId, multipartFile);
        ApiResponse result = new ApiResponse(true, "면접 녹음 등록 성공");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

}
