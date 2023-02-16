package com.alppano.speakon.security.oauth;

import com.alppano.speakon.security.LoginUser;
import com.alppano.speakon.security.oauth.provider.KakaoOAuthUserInfo;
import com.alppano.speakon.security.oauth.provider.OAuthUserInfo;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrincipalOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuthUserInfo oAuthUserInfo = null;

        if (provider.equals("kakao")) {
            oAuthUserInfo = new KakaoOAuthUserInfo(oAuth2User.getAttributes());
        }

        String providerId = oAuthUserInfo.getProviderId();
        String userId = provider + "_" + providerId;

        Optional<User> findUser = userRepository.findByUserId(userId);

        User user = null;

        if (findUser.isEmpty()) {

            user = User.builder()
                    .userId(userId)
                    .name(oAuthUserInfo.getName())
                    .email(oAuthUserInfo.getEmail())
                    .password(bCryptPasswordEncoder.encode(UUID.randomUUID().toString()))
                    .provider(provider)
                    .build();

            userRepository.save(user);
        } else {
            user = findUser.get();
        }

        return new LoginUser(user);
    }
}
