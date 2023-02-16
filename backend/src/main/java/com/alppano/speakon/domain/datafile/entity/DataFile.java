package com.alppano.speakon.domain.datafile.entity;

import com.alppano.speakon.common.entity.BaseTimeEntity;
import com.alppano.speakon.domain.resume.entity.Resume;
import lombok.*;

import javax.persistence.*;

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
