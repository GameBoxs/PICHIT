package com.alppano.speakon.common.util;

import com.alppano.speakon.common.exception.ResourceNotFoundException;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
@Slf4j
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

    public DataFile storeOpenViduRecordingFile(String sessionId, String fileName) throws IOException {
        String originalFilename = fileName;
        String storedFileName = createStoreFileName(originalFilename);
        String contentType = "video/webm";

        File from = new File(getOpenviduFullPath(sessionId + "/" + fileName));
        File to = new File(getFullPath(storedFileName));

        try {
            moveFile(from, to);
            String envFileName = ".recording." + sessionId;
            deleteFile(getOpenviduFullPath(sessionId + "/" + envFileName));
        } catch (IOException e) {
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

    public boolean deleteFile(String path) {
        File temp = new File(getFullPath(path));
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

    private void moveFile(File src, File dest) throws IOException {
        Files.move(src.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }
}
