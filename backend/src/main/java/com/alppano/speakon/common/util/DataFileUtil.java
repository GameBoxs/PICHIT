package com.alppano.speakon.common.util;

import com.alppano.speakon.common.exception.ResourceNotFoundException;
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

    @Value("${openvidu.OPENVIDU_RECORDING_PATH}")
    private String openviduDir;

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    public String getOpenviduFullPath(String path) {
        return openviduDir + path;
    }

    public DataFile storeFile(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storedFileName = createStoreFileName(originalFilename);
        String contentType = multipartFile.getContentType();

        multipartFile.transferTo(new File(getFullPath(storedFileName)));

        return createDataFile(originalFilename, storedFileName, contentType);
    }

    public DataFile storeOpenViduRecordingFile(String sessionId, String fileName) {
        File temp = new File(getOpenviduFullPath(sessionId + "/" + fileName));

        String originalFilename = fileName;
        String storedFileName = createStoreFileName(originalFilename);
        String contentType = "video/webm";

        if (!temp.renameTo(new File(getFullPath(storedFileName)))) {
            throw new ResourceNotFoundException("면접 녹음파일 저장에 실패하였습니다.");
        }

        return createDataFile(originalFilename, storedFileName, contentType);
    }

    public DataFile createDataFile(String originalFilename, String storedFileName, String contentType) {
        DataFile dataFile = DataFile.builder()
                .originalFileName(originalFilename)
                .storedFileName(storedFileName)
                .contentType(contentType)
                .build();
        return dataFile;
    }

    public boolean deleteFile(DataFile dataFile) {
        File temp = new File(getFullPath(dataFile.getStoredFileName()));
        if (temp.exists()) {
            temp.delete();
        }
        return false;
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
