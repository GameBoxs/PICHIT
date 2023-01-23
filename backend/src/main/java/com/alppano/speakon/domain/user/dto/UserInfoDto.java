package com.alppano.speakon.domain.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoDto {
    private Long id;
    private String name;
    private String email;

    @Builder
    public UserInfoDto(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

}
