package com.alppano.speakon.security.oauth;

import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.security.jwt.JwtUtil;
import com.alppano.speakon.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;
import static com.alppano.speakon.security.jwt.JwtUtil.TOKEN_VALIDATION_SECOND;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${app.oauth2.authorizedRedirectUri}")
    private String redirectUri;
    private final JwtUtil jwtUtil;

    private final CookieUtil cookieUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (response.isCommitted()) {
            return;
        }
        LoginUser user = (LoginUser) authentication.getPrincipal();

        String accessToken = jwtUtil.createToken(user);
        Cookie tokenCookie = cookieUtil.createCookie(ACCESS_TOKEN_NAME, accessToken, (int) TOKEN_VALIDATION_SECOND);

        response.addCookie(tokenCookie);

        getRedirectStrategy().sendRedirect(request, response, redirectUri);
    }

}