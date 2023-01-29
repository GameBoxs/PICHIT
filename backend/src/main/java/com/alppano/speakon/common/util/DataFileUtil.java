package com.alppano.speakon.common.util;

import com.alppano.speakon.domain.datafile.entity.DataFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class DataFileUtil {

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    public DataFile storeFile(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storedFileName = createStoreFileName(originalFilename);
        String contentType = multipartFile.getContentType();
        multipartFile.transferTo(new File(getFullPath(storedFileName)));

        DataFile dataFile = DataFile.builder()
                .originalFileName(originalFilename)
                .storedFileName(storedFileName)
                .contentType(contentType)
                .build();
        return dataFile;
    }

    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
