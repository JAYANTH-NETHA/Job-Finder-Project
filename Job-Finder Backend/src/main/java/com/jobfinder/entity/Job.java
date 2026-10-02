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
@Table(name = "Jobs")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int job_id; //For Above 2
	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;  //For Above 2
	
	private String job_title;
	private String job_description;
	private String job_location;
	private String job_salary;
	private String job_experience;
	private String job_type;
	private LocalDate job_posted_on;
	
	public Job() {
		
	}
	
	public int getJob_id() {
		return job_id;
	}
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}
	
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
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
