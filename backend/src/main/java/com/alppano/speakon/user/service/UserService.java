package com.alppano.speakon.user.service;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.exception.ResourceNotFoundException;
import com.alppano.speakon.user.entity.User;
import com.alppano.speakon.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("회원"));
        userRepository.delete(user);
        return true;
    }

}
