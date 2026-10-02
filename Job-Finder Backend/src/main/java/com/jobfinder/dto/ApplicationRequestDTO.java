package com.jobfinder.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ApplicationRequestDTO {

    @NotNull(message = "User ID is required")
    @Positive(message = "User ID must be greater than 0")
    private Integer user_id;

    @NotNull(message = "Job ID is required")
    @Positive(message = "Job ID must be greater than 0")
    private Integer job_id;

    @NotBlank(message = "Resume is required")
    private String application_resume;

    @NotNull(message = "Application date is required")
    private LocalDate application_applied_on;

    @NotBlank(message = "Application status is required")
    private String application_status;

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    public String getApplication_resume() {
        return application_resume;
    }

    public void setApplication_resume(String application_resume) {
        this.application_resume = application_resume;
    }

    public LocalDate getApplication_applied_on() {
        return application_applied_on;
    }

    public void setApplication_applied_on(LocalDate application_applied_on) {
        this.application_applied_on = application_applied_on;
    }

    public String getApplication_status() {
        return application_status;
    }

    public void setApplication_status(String application_status) {
        this.application_status = application_status;
    }
}