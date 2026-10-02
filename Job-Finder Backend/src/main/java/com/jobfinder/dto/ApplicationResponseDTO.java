package com.jobfinder.dto;

import java.time.LocalDate;

public class ApplicationResponseDTO {
	private int application_id;
	private int job_id;
	private int user_id;
	private String application_resume;
	private LocalDate application_applied_on;
	private String application_status;
	
	public ApplicationResponseDTO() {
		
	}

	public int getApplication_id() {
		return application_id;
	}

	public void setApplication_id(int application_id) {
		this.application_id = application_id;
	}

	public int getJob_id() {
		return job_id;
	}

	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
