package com.jobfinder.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class JobRequestDTO {

    @NotNull(message = "Company ID is required")
    @Positive(message = "Company ID must be greater than 0")
    private Integer company_id;

    @NotBlank(message = "Job title is required")
    private String job_title;

    @NotBlank(message = "Job description is required")
    private String job_description;

    @NotBlank(message = "Job location is required")
    private String job_location;

    @NotBlank(message = "Job salary is required")
    private String job_salary;

    @NotBlank(message = "Job experience is required")
    private String job_experience;

    @NotBlank(message = "Job type is required")
    private String job_type;

    @NotNull(message = "Job posted date is required")
    private LocalDate job_posted_on;


    public Integer getCompany_id() {
        return company_id;
    }

    public void setCompany_id(Integer company_id) {
        this.company_id = company_id;
    }


    public String getJob_title() {
        return job_title;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }


    public String getJob_description() {
        return job_description;
    }

    public void setJob_description(String job_description) {
        this.job_description = job_description;
    }


    public String getJob_location() {
        return job_location;
    }

    public void setJob_location(String job_location) {
        this.job_location = job_location;
    }


    public String getJob_salary() {
        return job_salary;
    }

    public void setJob_salary(String job_salary) {
        this.job_salary = job_salary;
    }


    public String getJob_experience() {
        return job_experience;
    }

    public void setJob_experience(String job_experience) {
        this.job_experience = job_experience;
    }


    public String getJob_type() {
        return job_type;
    }

    public void setJob_type(String job_type) {
        this.job_type = job_type;
    }


    public LocalDate getJob_posted_on() {
        return job_posted_on;
    }

    public void setJob_posted_on(LocalDate job_posted_on) {
        this.job_posted_on = job_posted_on;
    }
}