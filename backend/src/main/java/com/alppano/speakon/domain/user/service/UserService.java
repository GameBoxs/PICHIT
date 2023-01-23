package com.alppano.speakon.domain.user.service;

import com.alppano.speakon.domain.user.dto.ModifyUserNameDto;
import com.alppano.speakon.domain.user.dto.UserInfoDto;
import com.alppano.speakon.domain.user.entity.User;
import com.alppano.speakon.domain.user.repository.UserRepository;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserInfoDto getUserInfo(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("회원"));

        UserInfoDto userInfo = UserInfoDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();

        return userInfo;
    }

    @Transactional
    public boolean modifyUserName(Long id, ModifyUserNameDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("회원"));
        user.setName(dto.getName());
        return true;
    }

    @Transactional
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("회원"));
        userRepository.delete(user);
        return true;
    }

}
