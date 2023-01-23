package com.alppano.speakon.common.exception;

import com.alppano.speakon.common.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private ApiResponse apiResponse;

    public ResourceNotFoundException(String resourceName) {
        super();
        setApiResponse(resourceName);
    }

    public ApiResponse getApiResponse() {
        return apiResponse;
    }

    private void setApiResponse(String resourceName) {
        String message = String.format("존재하지 않는 %s 입니다.", resourceName);

        apiResponse = new ApiResponse(false, message);
    }

}