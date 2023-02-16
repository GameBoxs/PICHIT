package com.alppano.speakon.common.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
public class PagedResult<T> {
    List<T> content;
    private long totalElements;
    private int totalPages;
    private int numberOfElements;
    private int page;
    private int size;

    public PagedResult(Page<T> data) {
        this.content = data.getContent();
        this.totalElements = data.getTotalElements();
        this.totalPages = data.getTotalPages();
        this.numberOfElements = data.getNumberOfElements();
        this.page = data.getNumber();
        this.size = data.getSize();
    }
}
