package com.alppano.speakon.domain.recording_timestamp.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.recording_timestamp.dto.RecordingTimestampRequest;
import com.alppano.speakon.domain.recording_timestamp.service.RecordingTimestampService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "면접 녹음 타임스탬프 관리")
@RestController
@RequiredArgsConstructor
public class RecordingTimestampController {

    private final RecordingTimestampService recordingTimestampService;

    @Operation(summary = "면접 녹음 타임스탬프 등록")
    @PostMapping("/recording-timestamps")
    public ResponseEntity<ApiResponse> createRecordingTimestamp(@RequestBody RecordingTimestampRequest dto) {
        recordingTimestampService.createRecordingTimestamp(dto);
        ApiResponse result = new ApiResponse(true, "타임스탬프 등록 완료");
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "면접 녹음 타임스탬프 삭제")
    @DeleteMapping("/recording-timestamps/{id}")
    public ResponseEntity<ApiResponse> deleteRecordingTimestamp(@PathVariable("id") Long timestampId) {
        recordingTimestampService.deleteRecordingTimestamp(timestampId);
        ApiResponse result = new ApiResponse(true, "타임스탬프 삭제 완료");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
