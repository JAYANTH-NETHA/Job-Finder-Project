package com.jobfinder.service;


import java.util.ArrayList;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobfinder.dto.LoginRequestDTO;
import com.jobfinder.dto.LoginResponseDTO;
import com.jobfinder.dto.UserRequestDTO;
import com.jobfinder.dto.UserResponseDTO;
import com.jobfinder.entity.User;
import com.jobfinder.repository.UserRepository;

@Service
public class UserService {
//	private final UserRepository userRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	//Constructor
//	public UserService (UserRepository userRepository) {
//		this.userRepository = userRepository;
//	}
	public UserService(
	        UserRepository userRepository,
	        PasswordEncoder passwordEncoder) {

	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	}
	 //save
//	public User saveUser(User user) {
//		return userRepository.save(user);
//	}
	public UserResponseDTO saveUser(UserRequestDTO userRequestDTO) {
		User user = new User();
		user.setUser_name(userRequestDTO.getUser_name());
		user.setUser_email(userRequestDTO.getUser_email());
//		user.setUser_password(userRequestDTO.getUser_password());
		user.setUser_password(
		        passwordEncoder.encode(
		                userRequestDTO.getUser_password()
		        )
		);
		user.setUser_phone(userRequestDTO.getUser_phone());
		user.setUser_role(userRequestDTO.getUser_role());
		
		User savedUser = userRepository.save(user);
		UserResponseDTO response = new UserResponseDTO();
		
		response.setUser_id(savedUser.getUser_id());
		response.setUser_name(savedUser.getUser_name());
		response.setUser_email(savedUser.getUser_email());
		response.setUser_phone(savedUser.getUser_phone());
		response.setUser_role(savedUser.getUser_role());
		
		return response;
			
	}
	//findAll
//	public List<User> getAllUsers () {
//		return userRepository.findAll();
//	}
	// findAll
	public List<UserResponseDTO> getAllUsers() {

	    List<User> users = userRepository.findAll();

	    List<UserResponseDTO> responseList = new ArrayList<>();

	    for (User user : users) {

	        UserResponseDTO response = new UserResponseDTO();

	        response.setUser_id(user.getUser_id());
	        response.setUser_name(user.getUser_name());
	        response.setUser_email(user.getUser_email());
	        response.setUser_phone(user.getUser_phone());
	        response.setUser_role(user.getUser_role());

	        responseList.add(response);
	    }

	    return responseList;
	}
	//findById
//	public User getUserById(int id) {
//		return userRepository.findById(id).orElse(null);
//	}
	// findById
	public UserResponseDTO getUserById(int id) {

	    User user = userRepository.findById(id).orElse(null);

	    if (user == null) {
	        return null;
	    }

	    UserResponseDTO response = new UserResponseDTO();

	    response.setUser_id(user.getUser_id());
	    response.setUser_name(user.getUser_name());
	    response.setUser_email(user.getUser_email());
	    response.setUser_phone(user.getUser_phone());
	    response.setUser_role(user.getUser_role());

	    return response;
	}
	//Delete user
	public void deleteUser(int id) {
		userRepository.deleteById(id);
	}
	
	
	// Update user
	public UserResponseDTO updateUser(int id, UserRequestDTO userRequestDTO) {

	    User user = userRepository.findById(id).orElse(null);

	    if (user == null) {
	        return null;
	    }

	    user.setUser_name(userRequestDTO.getUser_name());
	    user.setUser_email(userRequestDTO.getUser_email());
//	    user.setUser_password(userRequestDTO.getUser_password());
	    user.setUser_password(
	            passwordEncoder.encode(
	                    userRequestDTO.getUser_password()
	            )
	    );
	    user.setUser_phone(userRequestDTO.getUser_phone());
	    user.setUser_role(userRequestDTO.getUser_role());

	    User updatedUser = userRepository.save(user);

	    UserResponseDTO response = new UserResponseDTO();

	    response.setUser_id(updatedUser.getUser_id());
	    response.setUser_name(updatedUser.getUser_name());
	    response.setUser_email(updatedUser.getUser_email());
	    response.setUser_phone(updatedUser.getUser_phone());
	    response.setUser_role(updatedUser.getUser_role());

	    return response;
	}
	public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

	    User user = userRepository
	            .findByUserEmail(loginRequestDTO.getUser_email())
	            .orElseThrow(() ->
	                    new ResponseStatusException(
	                            HttpStatus.UNAUTHORIZED,
	                            "Invalid email or password"));

	    boolean passwordMatch = passwordEncoder.matches(
	            loginRequestDTO.getUser_password(),
	            user.getUser_password());

	    if (!passwordMatch) {
	        throw new ResponseStatusException(
	                HttpStatus.UNAUTHORIZED,
	                "Invalid email or password");
	    }

	    LoginResponseDTO response = new LoginResponseDTO();

	    response.setUser_id(user.getUser_id());
	    response.setUser_name(user.getUser_name());
	    response.setUser_email(user.getUser_email());
	    response.setUser_role(user.getUser_role());

	    return response;
	}
}
