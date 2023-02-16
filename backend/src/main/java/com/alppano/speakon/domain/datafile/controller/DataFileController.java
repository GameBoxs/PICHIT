package com.alppano.speakon.domain.datafile.controller;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.domain.datafile.dto.DataFileResource;
import com.alppano.speakon.domain.datafile.entity.DataFile;
import com.alppano.speakon.domain.datafile.service.DataFileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;

@Slf4j
@Tag(name = "파일 관리")
@RestController
@RequiredArgsConstructor
public class DataFileController {
    private final DataFileService dataFileService;

    @Operation(summary = "파일 등록")
    @PostMapping("/datafiles")
    public ResponseEntity<ApiResponse<DataFile>> saveDataFile(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        DataFile datafile = dataFileService.createDataFile(multipartFile);
        ApiResponse<DataFile> result = new ApiResponse<>(true, "성공", datafile);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @Operation(summary = "파일 열기")
    @GetMapping("/datafiles/{id}")
    public ResponseEntity<Resource> getDataFile(@PathVariable Long id) throws MalformedURLException {
        DataFileResource dataFileResource = dataFileService.getDataFileResource(id);

        String contentDisposition = "inline; filename=\"" + dataFileResource.getEncodedFileName() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dataFileResource.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(dataFileResource);
    }

    @Operation(summary = "파일 삭제")
    @DeleteMapping("/datafiles/{id}")
    public ResponseEntity<ApiResponse> deleteDataFile(@PathVariable Long id) {
        dataFileService.deleteDataFile(id);
        ApiResponse result = new ApiResponse(true, "파일 삭제 성공");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
