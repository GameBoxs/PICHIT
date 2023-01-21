package com.alppano.speakon.security.jwt;

import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.user.entity.User;
import com.alppano.speakon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.alppano.speakon.security.jwt.JwtUtil.ACCESS_TOKEN_NAME;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();

        String jwt = null;
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals(ACCESS_TOKEN_NAME)) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        try {
            Long id = jwtUtil.getId(jwt);

            if (id != null) {
                User user = userRepository.findById(id).orElseThrow();

                LoginUser loginUser = new LoginUser(user);
                if (jwtUtil.validateToken(jwt, user)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        } catch (Exception e) {

        }

        filterChain.doFilter(request, response);
    }
}