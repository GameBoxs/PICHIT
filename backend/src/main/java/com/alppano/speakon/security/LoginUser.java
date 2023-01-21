package com.alppano.speakon.security;

import com.alppano.speakon.security.oauth.provider.OAuthUserInfo;
import com.alppano.speakon.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class LoginUser implements OAuth2User, UserDetails {

    private final User user;

    /**
     * 유저의 인조키 값을 반환하는 메소드
     * @return 유저의 인조키
     * <br>
     * ex) 1
     */
    public Long getId() {
        return user.getId();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * 유저의 실제 아이디를 반환하는 메소드
     * @return 유저의 실제 아이디
     * <br>
     * ex) kakao_123456
     */
    @Override
    public String getUsername() {
        return user.getUserId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * 유저의 이름을 반환하는 메소드
     * @return 유저의 이름
     * <br>
     * ex) 이희수
     */
    @Override
    public String getName() {
        return user.getName();
    }
}
