package com.alppano.speakon.config;

import com.alppano.speakon.common.dto.ApiResponse;
import com.alppano.speakon.common.exception.ResourceAlreadyExistsException;
import com.alppano.speakon.common.exception.ResourceForbiddenException;
import com.alppano.speakon.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestControllerExceptionHandler {

    /**
     * 데이터가 존재하지 않는 경우 예외 처리
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> resolveException(ResourceNotFoundException exception) {
        ApiResponse apiResponse = exception.getApiResponse();
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * 데이터에 접근 권한이 없는 경우 예외 처리
     */
    @ExceptionHandler(ResourceForbiddenException.class)
    public ResponseEntity<ApiResponse> resolveException(ResourceForbiddenException exception) {
        ApiResponse apiResponse = exception.getApiResponse();
        return new ResponseEntity<>(apiResponse, HttpStatus.FORBIDDEN);
    }

    /**
     * 이미 존재하는 데이터인 경우 예외 처리
     */
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> resolveException(ResourceAlreadyExistsException exception) {
        ApiResponse apiResponse = exception.getApiResponse();
        return new ResponseEntity<>(apiResponse, HttpStatus.CONFLICT);
    }
}