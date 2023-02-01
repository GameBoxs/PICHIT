package com.alppano.speakon.domain.interview_room.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.common.dto.PagedResult;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomDetailInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomInfo;
import com.alppano.speakon.domain.interview_room.dto.InterviewRoomRequest;
import com.alppano.speakon.domain.interview_room.service.InterviewRoomService;
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

@Tag(name = "면접방 관리")
@RestController
@RequiredArgsConstructor
public class InterviewRoomController {

    private final InterviewRoomService interviewRoomService;

    @Operation(summary = "면접방 생성")
    @PostMapping("/interviewrooms")
    public ResponseEntity<ApiResponse<InterviewRoomInfo>> createInterviewRoom(@AuthenticationPrincipal LoginUser loginUser,
                                                                              @RequestBody InterviewRoomRequest dto) {

        InterviewRoomInfo InterviewRoomInfo = interviewRoomService.createInterviewRoom(dto, loginUser.getId());

        ApiResponse<InterviewRoomInfo> result = new ApiResponse(Boolean.TRUE, "면접방 생성 성공", InterviewRoomInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접방 삭제")
    @DeleteMapping("/interviewrooms/{id}")
    public ResponseEntity<ApiResponse<InterviewRoomDetailInfo>> deleteInterviewRoom(@AuthenticationPrincipal LoginUser loginUser,
                                                                                    @PathVariable("id") Long interviewRoomId) {
        interviewRoomService.deleteInterviewRoom(interviewRoomId, loginUser.getId());

        ApiResponse<InterviewRoomDetailInfo> result = new ApiResponse(Boolean.TRUE, "면접방 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접방 상세조회")
    @GetMapping("/interviewrooms/{id}")
    public ResponseEntity<ApiResponse<InterviewRoomDetailInfo>> getInterviewRoomDetailInfo(@AuthenticationPrincipal LoginUser loginUser,
                                                                                           @PathVariable("id") Long interviewRoomId) {
        InterviewRoomDetailInfo interviewRoomDetailInfo = interviewRoomService.getInterviewRoomDetailInfo(interviewRoomId, loginUser.getId());

        ApiResponse<InterviewRoomDetailInfo> result = new ApiResponse(Boolean.TRUE, "조회 성공", interviewRoomDetailInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접방 검색")
    @GetMapping("/interviewrooms")
    public ResponseEntity<ApiResponse<PagedResult<InterviewRoomInfo>>> searchInterviewRooms(@PageableDefault(size = 9, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                                                                            @RequestParam(required = false) String title,
                                                                                            @RequestParam(required = false) Integer finished) {
        PagedResult<InterviewRoomInfo> list = interviewRoomService.searchInterviewRooms(pageable, title, finished);
        ApiResponse<PagedResult<InterviewRoomInfo>> result = new ApiResponse(Boolean.TRUE, "조회 성공", list);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "면접방 상태 수정")
    @PutMapping("/interviewrooms/{id}/finished")
    public ResponseEntity<ApiResponse> setInterviewRoomFinishedStatus(@AuthenticationPrincipal LoginUser loginUser,
                                                                      @PathVariable("id") Long interviewRoomId,
                                                                      @RequestParam(required = false, defaultValue = "1") Integer finished) {
        interviewRoomService.setInterviewRoomFinishedStatus(interviewRoomId, finished, loginUser.getId());
        ApiResponse result = new ApiResponse(Boolean.TRUE, "면접방 상태 수정 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
