package com.alppano.speakon.user.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * 사용자 Entity
 */
@Entity
@Data
@NoArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * provider + "_" + provider_id
     */
    @Column(length = 100, nullable = false, unique = true)
    private String userId;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 50)
    private String email;

    @Column(length = 30, nullable = false)
    private String provider;

    @Builder
    public User(String userId, String password, String name, String email, String provider) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.provider = provider;
    }
}
