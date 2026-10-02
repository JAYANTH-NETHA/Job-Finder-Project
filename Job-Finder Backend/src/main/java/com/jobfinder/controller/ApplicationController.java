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

import com.jobfinder.dto.ApplicationRequestDTO;
import com.jobfinder.dto.ApplicationResponseDTO;
import com.jobfinder.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
	private final ApplicationService applicationService;
	
	//Constructor
	public ApplicationController (ApplicationService applicationService) {
		this.applicationService = applicationService;
	}
	
	//save
//	@PostMapping
//	public ApplicationResponseDTO saveApplication(@RequestBody ApplicationRequestDTO applicationRequestDTO) {
//		return applicationService.saveApplication(applicationRequestDTO); 
//	}
	@PostMapping
	public ApplicationResponseDTO saveApplication(
	        @Valid @RequestBody ApplicationRequestDTO applicationRequestDTO) {

	    return applicationService.saveApplication(applicationRequestDTO);
	}
	//findAll
	@GetMapping
	public List<ApplicationResponseDTO> getAllApplications() {
		return applicationService.getAllApplications();
	}
	
	@GetMapping("/user/{user_id}")
	public List<ApplicationResponseDTO> getApplicationsByUser(
	        @PathVariable int user_id) {

	    return applicationService.getApplicationsByUser(user_id);
	}


	@GetMapping("/job/{job_id}")
	public List<ApplicationResponseDTO> getApplicationsByJob(
	        @PathVariable int job_id) {

	    return applicationService.getApplicationsByJob(job_id);
	}
	//findById
	@GetMapping("/{id}")
	public ApplicationResponseDTO getApplicationById(@PathVariable int id) {
		return applicationService.getApplicationById(id);
	}
	//Update By Id
//	@PutMapping("/{id}")
//	public ApplicationResponseDTO updateApplication(@PathVariable int id,@RequestBody ApplicationRequestDTO applicationRequestDTO) {
//	    return applicationService.updateApplication(id,applicationRequestDTO);
//	}
	@PutMapping("/{id}")
	public ApplicationResponseDTO updateApplication(@PathVariable int id,@Valid @RequestBody ApplicationRequestDTO applicationRequestDTO) {
	    return applicationService.updateApplication(id,applicationRequestDTO);
	}
	//deletebById
	@DeleteMapping("/{id}")
	public String deleteApplicationById(@PathVariable int id) {
		applicationService.deleteApplication(id);
		return "Application Controller Successful";
	}
	
	
	
	
	
}
