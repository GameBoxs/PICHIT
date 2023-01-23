package com.alppano.speakon.datafile.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DataFile extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 100, nullable = false)
    private String originalFileName;

    @Column(length = 100, nullable = false)
    private String storedFileName;

    @Column(length = 50, nullable = false)
    private String contentType;

}
