package com.jobfinder.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobfinder.dto.JobRequestDTO;
import com.jobfinder.dto.JobResponseDTO;
import com.jobfinder.entity.Company;
import com.jobfinder.entity.Job;
import com.jobfinder.repository.CompanyRepository;
import com.jobfinder.repository.JobRepository;


@Service
public class JobService {
	private final JobRepository jobRepository;
	private final CompanyRepository companyRepository;
	
	public JobService (JobRepository jobRepository,CompanyRepository companyRepository) {
		this.jobRepository = jobRepository;
		this.companyRepository = companyRepository;
	}
	//save
//	public Job saveJob(Job job) {
//		return jobRepository.save(job);
//	}
	public JobResponseDTO saveJob (JobRequestDTO jobRequestDTO) {
		
		//get company by Company_id
		Company company = companyRepository.findById(jobRequestDTO.getCompany_id()).orElse(null);
		//id Company does not Exists
//		if(company == null) {
//			return null;
//		}
		
		if(company == null) {
		    throw new ResponseStatusException(
		        HttpStatus.NOT_FOUND,
		        "Company not found with ID: " + jobRequestDTO.getCompany_id()
		    );
		}
		Job job = new Job();
		job.setCompany(company);
		job.setJob_title(jobRequestDTO.getJob_title());
		job.setJob_description(jobRequestDTO.getJob_description());
		job.setJob_location(jobRequestDTO.getJob_location());
		job.setJob_salary(jobRequestDTO.getJob_salary());
		job.setJob_experience(jobRequestDTO.getJob_experience());
		job.setJob_type(jobRequestDTO.getJob_type());
		job.setJob_posted_on(jobRequestDTO.getJob_posted_on());
		
		Job savedJob = jobRepository.save(job);
		JobResponseDTO response = new JobResponseDTO();
		
		
		response.setJob_id(savedJob.getJob_id());
		response.setCompany_id(savedJob.getCompany().getCompany_id());
		response.setJob_title(savedJob.getJob_title());
		response.setJob_description(savedJob.getJob_description());
		response.setJob_location(savedJob.getJob_location());
		response.setJob_salary(savedJob.getJob_salary());
		response.setJob_experience(savedJob.getJob_experience());
		response.setJob_type(savedJob.getJob_type());
		response.setJob_posted_on(savedJob.getJob_posted_on());
		
		return response;
		
	}
	
	//findAll
//	public List<Job> getAllJobs () {
//		return jobRepository.findAll();
//	}
	
	public List<JobResponseDTO> getAllJobs(){
		
		List <Job> jobs = jobRepository.findAll();
		List <JobResponseDTO> responselist = new ArrayList<>(); 
		
		for(Job job : jobs) {
			JobResponseDTO response = new JobResponseDTO();
			
			response.setJob_id(job.getJob_id());
			response.setCompany_id(job.getCompany().getCompany_id());
			response.setJob_title(job.getJob_title());
			response.setJob_description(job.getJob_description());
			response.setJob_location(job.getJob_location());
			response.setJob_experience(job.getJob_experience());
			response.setJob_salary(job.getJob_salary());
			response.setJob_type(job.getJob_type());
			response.setJob_posted_on(job.getJob_posted_on());
			
			responselist.add(response);
		}
		
		
		return responselist;
		
	}
	//find By id
//	public Job getJobById(int id) {
//		return jobRepository.findById(id).orElse(null);
//	}
	
	public JobResponseDTO getJobById(int id) {
		Job job = jobRepository.findById(id).orElse(null);
		if(job == null) {
			return null;
		}
		JobResponseDTO response = new JobResponseDTO();
		response.setJob_id(job.getJob_id());
		response.setCompany_id(job.getCompany().getCompany_id());
		response.setJob_title(job.getJob_title());
		response.setJob_description(job.getJob_description());
		response.setJob_location(job.getJob_location());
		response.setJob_experience(job.getJob_experience());
		response.setJob_salary(job.getJob_salary());
		response.setJob_type(job.getJob_type());
		response.setJob_posted_on(job.getJob_posted_on());
		
		
		return response;
		
	}
	//update
	public JobResponseDTO updateJob(int id, JobRequestDTO jobRequestDTO) {

	    //find existing job
	    Job job = jobRepository.findById(id).orElse(null);

	    //job does not exist
	    if (job == null) {
	        return null;
	    }

	    //find company
	    Company company = companyRepository
	            .findById(jobRequestDTO.getCompany_id())
	            .orElse(null);

	    //company does not exist
	    if (company == null) {
	        return null;
	    }

	    //update job details
	    job.setCompany(company);
	    job.setJob_title(jobRequestDTO.getJob_title());
	    job.setJob_description(jobRequestDTO.getJob_description());
	    job.setJob_location(jobRequestDTO.getJob_location());
	    job.setJob_salary(jobRequestDTO.getJob_salary());
	    job.setJob_experience(jobRequestDTO.getJob_experience());
	    job.setJob_type(jobRequestDTO.getJob_type());
	    job.setJob_posted_on(jobRequestDTO.getJob_posted_on());

	    //save updated job
	    Job updatedJob = jobRepository.save(job);

	    //convert entity to response DTO
	    JobResponseDTO response = new JobResponseDTO();

	    response.setJob_id(updatedJob.getJob_id());
	    response.setCompany_id(updatedJob.getCompany().getCompany_id());
	    response.setJob_title(updatedJob.getJob_title());
	    response.setJob_description(updatedJob.getJob_description());
	    response.setJob_location(updatedJob.getJob_location());
	    response.setJob_salary(updatedJob.getJob_salary());
	    response.setJob_experience(updatedJob.getJob_experience());
	    response.setJob_type(updatedJob.getJob_type());
	    response.setJob_posted_on(updatedJob.getJob_posted_on());

	    return response;
	}
	//search jobs by title
	public List<JobResponseDTO> searchJobsByTitle(String title) {

	    List<Job> jobs = jobRepository.findByJob_titleContainingIgnoreCase(title);

	    List<JobResponseDTO> responselist = new ArrayList<>();

	    for (Job job : jobs) {

	        JobResponseDTO response = new JobResponseDTO();

	        response.setJob_id(job.getJob_id());
	        response.setCompany_id(job.getCompany().getCompany_id());
	        response.setJob_title(job.getJob_title());
	        response.setJob_description(job.getJob_description());
	        response.setJob_location(job.getJob_location());
	        response.setJob_salary(job.getJob_salary());
	        response.setJob_experience(job.getJob_experience());
	        response.setJob_type(job.getJob_type());
	        response.setJob_posted_on(job.getJob_posted_on());

	        responselist.add(response);
	    }

	    return responselist;
	}
	//search jobs by location
	public List<JobResponseDTO> searchJobsByLocation(String location) {

	    List<Job> jobs = jobRepository.findByJob_locationContainingIgnoreCase(location);

	    List<JobResponseDTO> responselist = new ArrayList<>();

	    for (Job job : jobs) {

	        JobResponseDTO response = new JobResponseDTO();

	        response.setJob_id(job.getJob_id());
	        response.setCompany_id(job.getCompany().getCompany_id());
	        response.setJob_title(job.getJob_title());
	        response.setJob_description(job.getJob_description());
	        response.setJob_location(job.getJob_location());
	        response.setJob_salary(job.getJob_salary());
	        response.setJob_experience(job.getJob_experience());
	        response.setJob_type(job.getJob_type());
	        response.setJob_posted_on(job.getJob_posted_on());

	        responselist.add(response);
	    }

	    return responselist;
	}
	// Combined job search and filtering
	public List<JobResponseDTO> searchJobs(
	        String title,
	        String location,
	        String jobType,
	        String experience,
	        Double minSalary,
	        Double maxSalary) {

	    List<Job> jobs = jobRepository.searchJobs(
	            title,
	            location,
	            jobType,
	            experience,
	            minSalary,
	            maxSalary);

	    List<JobResponseDTO> responselist = new ArrayList<>();

	    for (Job job : jobs) {

	        JobResponseDTO response = new JobResponseDTO();

	        response.setJob_id(job.getJob_id());
	        response.setCompany_id(job.getCompany().getCompany_id());
	        response.setJob_title(job.getJob_title());
	        response.setJob_description(job.getJob_description());
	        response.setJob_location(job.getJob_location());
	        response.setJob_salary(job.getJob_salary());
	        response.setJob_experience(job.getJob_experience());
	        response.setJob_type(job.getJob_type());
	        response.setJob_posted_on(job.getJob_posted_on());

	        responselist.add(response);
	    }

	    return responselist;
	}
	//delete
	public void deleteJob (int id) {
		jobRepository.deleteById(id);
	}
	//Sorting
	public List<JobResponseDTO> sortJobs(String sortBy, String order) {

	    List<Job> jobs;

	    if (sortBy.equalsIgnoreCase("salary")) {

	        if (order.equalsIgnoreCase("asc")) {
	            jobs = jobRepository.sortBySalaryAsc();
	        } else {
	            jobs = jobRepository.sortBySalaryDesc();
	        }

	    } else if (sortBy.equalsIgnoreCase("date")) {

	        if (order.equalsIgnoreCase("asc")) {
	            jobs = jobRepository.sortByOldest();
	        } else {
	            jobs = jobRepository.sortByNewest();
	        }

	    } else {
	        return new ArrayList<>();
	    }

	    List<JobResponseDTO> responselist = new ArrayList<>();

	    for (Job job : jobs) {

	        JobResponseDTO response = new JobResponseDTO();

	        response.setJob_id(job.getJob_id());
	        response.setCompany_id(job.getCompany().getCompany_id());
	        response.setJob_title(job.getJob_title());
	        response.setJob_description(job.getJob_description());
	        response.setJob_location(job.getJob_location());
	        response.setJob_salary(job.getJob_salary());
	        response.setJob_experience(job.getJob_experience());
	        response.setJob_type(job.getJob_type());
	        response.setJob_posted_on(job.getJob_posted_on());

	        responselist.add(response);
	    }

	    return responselist;
	}
	
	
	
	
	
	
	
	
	
	
	
}

