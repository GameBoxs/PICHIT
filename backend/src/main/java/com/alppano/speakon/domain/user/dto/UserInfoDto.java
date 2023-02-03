package com.alppano.speakon.domain.user.dto;

import com.alppano.speakon.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoDto {
    private Long id;
    private String name;
    private String email;

    public UserInfoDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
    }


}
