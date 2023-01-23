package com.alppano.speakon.common.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;

@Component
public class CookieUtil {

    public Cookie createCookie(String key, String value, int maxAge) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(maxAge);
        cookie.setPath("/");

        return cookie;
    }

    public String getCookieValue(Cookie[] cookies, String key) {
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals(ACCESS_TOKEN_NAME)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
