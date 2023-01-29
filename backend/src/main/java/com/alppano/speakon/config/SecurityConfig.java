package com.alppano.speakon.config;

import com.alppano.speakon.security.oauth.OAuth2AuthenticationFailureHandler;
import com.alppano.speakon.security.oauth.OAuth2AuthenticationSuccessHandler;
import com.alppano.speakon.security.oauth.PrincipalOAuth2UserService;
import com.alppano.speakon.security.jwt.JwtAuthenticationEntryPoint;
import com.alppano.speakon.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Spring Security 설정 클래스
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final PrincipalOAuth2UserService principalOauth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests() // 애플리케이션에 들어오는 요청에 대한 사용 권한을 체크
                .antMatchers( "/interviewjoins/**", "/users/**",
                        "/questions/**", "/feedbacks/**").authenticated()  // 인증이 되면 들어갈 수 있는 주소
                .antMatchers(HttpMethod.GET, "/interviewrooms").permitAll()
                .antMatchers(HttpMethod.POST,"/interviewrooms/**").authenticated()
                .antMatchers(HttpMethod.DELETE,"/interviewrooms/**").authenticated()
                .antMatchers(HttpMethod.PUT,"/interviewrooms/**").authenticated()
                .anyRequest().permitAll(); // 나머지 모든 주소에 대해서 인증 여부와 관계없이 허용

        http.cors()                     // CORS on
                .and()
                .csrf().disable()           // CSRF off
                .httpBasic().disable()     // Basic Auth off
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);    // Session off

        http.oauth2Login() // OAuth2 로그인 관련 처리를 설정할 수 있다.
                .userInfoEndpoint()
                .userService(principalOauth2UserService) // OAuth2 인증 과정에서 Authentication 생성에 필요한 OAuth2User를 반환하는 클래스를 지정
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler) // 인증 성공 후처리
                .failureHandler(oAuth2AuthenticationFailureHandler); // 인증 실패 후처리

        http.logout()
                .disable();

        http.exceptionHandling() // 예외 처리 설정
                // 인증되지 않은 사용자가 인증이 필요한 URL에 접근할 경우를 처리하는 클래스 지정
                .authenticationEntryPoint(jwtAuthenticationEntryPoint);

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
