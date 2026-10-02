package com.jobfinder.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Applications")
public class Application {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int application_id;
	@ManyToOne
	@JoinColumn(name = "job_id")
	private Job job;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	private String application_resume;
	private LocalDate application_applied_on;
	private String application_status;
	
	public Application() {
		
	}
	
	public int getApplication_id() {
		return application_id;
	}
	public void setApplication_id(int application_id) {
		this.application_id = application_id;
	}
	
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public String getApplication_resume() {
		return application_resume;
	}
	public void setApplication_resume(String application_resume) {
		this.application_resume = application_resume;
	}
	
	
	public LocalDate getApplication_applied_on () {
		return application_applied_on;
	}
	public void setApplication_applied_on (LocalDate application_applied_on) {
		this.application_applied_on = application_applied_on;
	}
	
	public String getApplication_status() {
		return application_status;
	}
	public void setApplication_status (String application_status) {
		this.application_status = application_status;
	}

	
	
	
	
	
	
	
	
	
	
}
