package com.jobfinder.controller;

import java.util.List;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.dto.LoginRequestDTO;
import com.jobfinder.dto.LoginResponseDTO;
import com.jobfinder.dto.UserRequestDTO;
import com.jobfinder.dto.UserResponseDTO;
import com.jobfinder.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;
	
	public UserController (UserService userService) {
		this.userService = userService;
	}
	
	//save
//	@PostMapping
//	public UserResponseDTO saveUser(@RequestBody UserRequestDTO userRequestDTO) {
//		return userService.saveUser(userRequestDTO);
//	}
	@PostMapping
	public UserResponseDTO saveUser(
	        @Valid @RequestBody UserRequestDTO userRequestDTO) {

	    return userService.saveUser(userRequestDTO);
	}
	//find all
	@GetMapping
	public List<UserResponseDTO> getAllUsers(){
		return userService.getAllUsers();
	}
	@PostMapping("/login")
	public LoginResponseDTO login(
	        @RequestBody LoginRequestDTO loginRequestDTO) {

	    return userService.login(loginRequestDTO);
	}
	//find by id 
	@GetMapping("/{id}")
	public UserResponseDTO getUserById(@PathVariable int id) {
		return userService.getUserById(id);
	}
	
	// Update user
//	@PutMapping("/{id}")
//	public UserResponseDTO updateUser(
//	        @PathVariable int id,
//	        @RequestBody UserRequestDTO userRequestDTO) {
//
//	    return userService.updateUser(id, userRequestDTO);
//	}
	@PutMapping("/{id}")
	public UserResponseDTO updateUser(
	        @PathVariable int id,
	        @Valid @RequestBody UserRequestDTO userRequestDTO) {

	    return userService.updateUser(id, userRequestDTO);
	}

	@DeleteMapping("/{id}")
	public String deleteUserById(@PathVariable int id) {
		userService.deleteUser(id);
		return "UserController Successful";
	}
	
}
