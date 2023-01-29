package com.alppano.speakon.domain.datafile.service;

import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.common.util.DataFileUtil;
import com.alppano.speakon.domain.datafile.dto.DataFileResource;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.repository.DataFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DataFileService {

    private final DataFileRepository dataFileRepository;
    private final DataFileUtil dataFileUtil;

    @Transactional
    public DataFile createDataFile(MultipartFile multipartFile) throws IOException {
        DataFile dataFile = dataFileUtil.storeFile(multipartFile);

        dataFileRepository.save(dataFile);

        return dataFile;
    }

    public DataFileResource getDataFileResource(Long id) throws MalformedURLException {
        DataFile dataFile = dataFileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 파일 입니다.")
        );

        String storeFileName = dataFile.getStoredFileName();
        String path = "file:" + dataFileUtil.getFullPath(storeFileName);
        String encodedFileName = UriUtils.encode(dataFile.getOriginalFileName(), StandardCharsets.UTF_8);
        String contentType = dataFile.getContentType();

        DataFileResource dataFileResource = new DataFileResource(path, contentType, encodedFileName);

        return dataFileResource;
    }

    @Transactional
    public void deleteDataFile(Long id) {
        DataFile dataFile = dataFileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("존재하지 않는 파일 입니다.")
        );

        dataFileUtil.deleteFile(dataFile);

        dataFileRepository.delete(dataFile);
    }
}
