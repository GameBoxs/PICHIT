package com.alppano.speakon.user.controller;

import com.alppano.speakon.security.LoginUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public String getUser(@AuthenticationPrincipal LoginUser loginUser) {
        return "Aa1";
    }
}
