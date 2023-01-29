package com.alppano.speakon.domain.datafile.repository;

import com.alppano.speakon.domain.datafile.entity.DataFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataFileRepository extends JpaRepository<DataFile, Long> {
}
