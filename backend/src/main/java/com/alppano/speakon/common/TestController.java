package com.alppano.speakon.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
public class TestController {

    @GetMapping("/test")
    public String kkk() {
        return "redirect:" + UriComponentsBuilder.fromUriString("http://hamchu-dev.shop:3000/login")
                .queryParam("accessToken", "aa")
                .queryParam("refreshToken", "asdaa")
                .build()
                .toUriString();
    }

    @GetMapping("/abc")
    public String asb() {
        return "redirect:" + UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                .queryParam("accessToken", "aa")
                .queryParam("refreshToken", "asdaa")
                .build()
                .toUriString();
    }
}
