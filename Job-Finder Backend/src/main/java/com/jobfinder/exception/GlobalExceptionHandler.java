package com.jobfinder.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error -> {
                    errors.put(
                            error.getField(),
                            error.getDefaultMessage()
                    );
                });

        Map<String, Object> response = new HashMap<>();

        response.put("status", 400);
        response.put("message", "Validation failed");
        response.put("errors", errors);

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
        
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(
            ResponseStatusException exception) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", exception.getStatusCode().value());
        response.put("message", exception.getReason());

        return new ResponseEntity<>(
                response,
                exception.getStatusCode()
        );
    }
}