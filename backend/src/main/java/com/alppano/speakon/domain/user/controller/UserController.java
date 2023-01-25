package com.alppano.speakon.domain.user.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.user.dto.ModifyUserNameDto;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import com.alppano.speakon.domain.user.service.UserService;
import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.common.util.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;

@Tag(name = "회원 관리")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final CookieUtil cookieUtil;

    @Operation(summary = "회원 정보 조회")
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserInfoDto>> getUserInfo(@PathVariable Long id) {
        UserInfoDto userInfo = userService.getUserInfo(id);
        ApiResponse<UserInfoDto> result = new ApiResponse<>(true, "정보 조회 완료", userInfo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원 정보 수정")
    @PutMapping("/users")
    public ResponseEntity<ApiResponse> modifyUserName(@AuthenticationPrincipal LoginUser loginUser,
                                                      @RequestBody ModifyUserNameDto dto) {
        userService.modifyUserName(loginUser.getId(), dto);
        ApiResponse result = new ApiResponse(true, "회원 이름 수정 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping("/users")
    public ResponseEntity<ApiResponse> deleteUser(@AuthenticationPrincipal LoginUser loginUser) {
        userService.deleteUser(loginUser.getId());

        ApiResponse result = new ApiResponse(true, "회원 탈퇴 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
