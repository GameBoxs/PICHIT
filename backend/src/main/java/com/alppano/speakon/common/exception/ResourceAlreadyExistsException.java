package com.alppano.speakon.common.exception;

import com.alppano.speakon.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends RuntimeException {

    private ApiResponse apiResponse;

    public ResourceAlreadyExistsException(String message) {
        super();
        apiResponse = new ApiResponse(false, message);
    }

    public ApiResponse getApiResponse() {
        return apiResponse;
    }

}