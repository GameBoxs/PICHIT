package com.alppano.speakon.user.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.security.LoginUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;

@RestController
public class UserController {

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse res) {
        Cookie token = new Cookie(ACCESS_TOKEN_NAME, null);
        token.setMaxAge(0);
        token.setPath("/");
        res.addCookie(token);
        return new ResponseEntity<>(new ApiResponse(Boolean.TRUE, "로그아웃 성공"), HttpStatus.OK);
    }
}
