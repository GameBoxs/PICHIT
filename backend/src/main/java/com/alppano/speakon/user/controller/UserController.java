package com.alppano.speakon.user.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.user.service.UserService;
import com.alppano.speakon.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final CookieUtil cookieUtil;

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse res) {
        Cookie token = cookieUtil.createCookie(ACCESS_TOKEN_NAME,null,0);
        res.addCookie(token);

        ApiResponse result = new ApiResponse(Boolean.TRUE, "로그아웃 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/users")
    public ResponseEntity<ApiResponse> deleteUser(@AuthenticationPrincipal LoginUser loginUser, HttpServletResponse res) {
        userService.deleteUser(loginUser.getId());

        Cookie token = cookieUtil.createCookie(ACCESS_TOKEN_NAME,null,0);
        res.addCookie(token);

        ApiResponse result = new ApiResponse(true, "회원 탈퇴 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
