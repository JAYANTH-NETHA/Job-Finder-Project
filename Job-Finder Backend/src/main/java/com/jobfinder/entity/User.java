package com.jobfinder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Declare all columns as Variables
	private int user_id; //For Id,GenerationValue and GeneratedType Annotations
	private String user_name;
	private String user_email;
	private String user_password;
	private String user_phone;
	private String user_role;
	
	public User() {
		
	}
	//Getters and Setters
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		 this.user_id = user_id;
	}
	
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		 this.user_name = user_name;
	}
	
	
	
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		 this.user_email = user_email;
	}
	
	
	
	public String getUser_password() {
		return user_password;
	}
	public void setUser_password(String user_password) {
		 this.user_password = user_password;
	}
	
	
	
	public String getUser_phone() {
		return user_phone;
	}
	public void setUser_phone(String user_phone) {
		 this.user_phone = user_phone;
	}
	
	
	
	public String getUser_role() {
		return user_role;
	}
	public void setUser_role(String user_role) {
		 this.user_role = user_role;
	}
	
	
	
	
}
