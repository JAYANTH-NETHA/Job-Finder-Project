package com.jobfinder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Companies")
public class Company {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int company_id;
	private String company_name;
	private String company_location;
	private String company_description;
	private String company_website;
	
	public Company() {
		
	}
	
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	
	
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
