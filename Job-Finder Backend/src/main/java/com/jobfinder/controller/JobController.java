package com.jobfinder.controller;

import java.util.List;



import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.dto.JobRequestDTO;
import com.jobfinder.dto.JobResponseDTO;
import com.jobfinder.service.JobService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/jobs")
public class JobController {
	private final JobService jobService;
	
	public JobController (JobService jobService) {
		this.jobService = jobService;
	}
	
	//save
//	@PostMapping
//	public JobResponseDTO saveJob(@RequestBody JobRequestDTO jobRequestDTO) {
//		return jobService.saveJob(jobRequestDTO);
//	}
	@PostMapping
	public JobResponseDTO saveJob(
	        @Valid @RequestBody JobRequestDTO jobRequestDTO) {

	    return jobService.saveJob(jobRequestDTO);
	}
	//FindAll
	@GetMapping
	public List<JobResponseDTO> getAllJobs() {
		return jobService.getAllJobs();
	}
	@GetMapping("/search")
	public List<JobResponseDTO> searchJobsByTitle(
	        @RequestParam String title) {

	    return jobService.searchJobsByTitle(title);
	}
	@GetMapping("/search/location")
	public List<JobResponseDTO> searchJobsByLocation(
	        @RequestParam String location) {

	    return jobService.searchJobsByLocation(location);
	}
	@GetMapping("/search/filter")
    public List<JobResponseDTO> searchJobs(

            @RequestParam(required = false) String title,

            @RequestParam(required = false) String location,

            @RequestParam(required = false) String jobType,

            @RequestParam(required = false) String experience,

            @RequestParam(required = false) Double minSalary,

            @RequestParam(required = false) Double maxSalary) {

        return jobService.searchJobs(
                title,
                location,
                jobType,
                experience,
                minSalary,
                maxSalary);
    }
	//findById
	@GetMapping("/{id}")
	public JobResponseDTO getJobById (@PathVariable int id) {
		return jobService.getJobById(id);
	}
	@GetMapping("/sort")
	public List<JobResponseDTO> sortJobs(
	        @RequestParam String sortBy,
	        @RequestParam String order) {

	    return jobService.sortJobs(sortBy, order);
	}
	//Update By Id
//	@PutMapping("/{id}")
//	public JobResponseDTO updateJob(
//	        @PathVariable int id,
//	        @RequestBody JobRequestDTO jobRequestDTO) {
//
//	    return jobService.updateJob(id, jobRequestDTO);
//	}
	@PutMapping("/{id}")
	public JobResponseDTO updateJob(
	        @PathVariable int id,
	        @Valid @RequestBody JobRequestDTO jobRequestDTO) {

	    return jobService.updateJob(id, jobRequestDTO);
	}
	//DeletById
	@DeleteMapping("/{id}")
	public String deleteJobById(@PathVariable int id) {
		jobService.deleteJob(id);
		return "Job Controller Successful";
	}
}
