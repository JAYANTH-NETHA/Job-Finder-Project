package com.jobfinder.dto;

import jakarta.validation.constraints.NotBlank;

public class CompanyRequestDTO {

    @NotBlank(message = "Company name is required")
    private String company_name;

    @NotBlank(message = "Company location is required")
    private String company_location;

    @NotBlank(message = "Company description is required")
    private String company_description;

    @NotBlank(message = "Company website is required")
    private String company_website;

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_location() {
        return company_location;
    }

    public void setCompany_location(String company_location) {
        this.company_location = company_location;
    }

    public String getCompany_description() {
        return company_description;
    }

    public void setCompany_description(String company_description) {
        this.company_description = company_description;
    }

    public String getCompany_website() {
        return company_website;
    }

    public void setCompany_website(String company_website) {
        this.company_website = company_website;
    }
}