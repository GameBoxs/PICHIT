package com.alppano.speakon.domain.datafile.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;

@Setter
@Getter
public class DataFileResource extends UrlResource {

    private String contentType;
    private String encodedFileName;

    public DataFileResource(String path, String contentType, String encodedFileName) throws MalformedURLException {
        super(path);
        this.contentType = contentType;
        this.encodedFileName = encodedFileName;
    }
}
