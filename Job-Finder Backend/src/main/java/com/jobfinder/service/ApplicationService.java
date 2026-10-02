package com.jobfinder.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobfinder.dto.ApplicationRequestDTO;
import com.jobfinder.dto.ApplicationResponseDTO;
import com.jobfinder.entity.Application;
import com.jobfinder.entity.Job;
import com.jobfinder.entity.User;
import com.jobfinder.repository.ApplicationRepository;
import com.jobfinder.repository.JobRepository;
import com.jobfinder.repository.UserRepository;

@Service
public class ApplicationService {
	private final ApplicationRepository applicationRepository;
	private final JobRepository jobRepository;
	private final UserRepository userRepository;
	
	public ApplicationService (ApplicationRepository applicationRepository,UserRepository userRepository,JobRepository jobRepository) {
		this.applicationRepository = applicationRepository;
		this.userRepository = userRepository;
		this.jobRepository = jobRepository;
	}
	//save
//	public Application saveApplication (Application application) {
//		return applicationRepository.save(application);
//	}
	public ApplicationResponseDTO saveApplication (ApplicationRequestDTO applicationRequestDTO) {
		User user = userRepository.findById(applicationRequestDTO.getUser_id()).orElse(null);
		Job job = jobRepository.findById(applicationRequestDTO.getJob_id()).orElse(null);
		
		
//		if(user == null) {
//			return null;
//		}
		if(user == null) {
		    throw new ResponseStatusException(
		        HttpStatus.NOT_FOUND,
		        "User not found with ID: " + applicationRequestDTO.getUser_id()
		    );
		}
		
//		if(job == null) {
//			return null;
//		}
		
		if(job == null) {
		    throw new ResponseStatusException(
		        HttpStatus.NOT_FOUND,
		        "Job not found with ID: " + applicationRequestDTO.getJob_id()
		    );
		}
		Application application = new Application();
		application.setJob(job);
		application.setUser(user);
		application.setApplication_resume(applicationRequestDTO.getApplication_resume());
		application.setApplication_applied_on(applicationRequestDTO.getApplication_applied_on());
		application.setApplication_status(applicationRequestDTO.getApplication_status());
		
		Application savedApplication = applicationRepository.save(application);
		ApplicationResponseDTO response = new ApplicationResponseDTO();
		
		response.setApplication_id(savedApplication.getApplication_id());
		response.setJob_id(savedApplication.getJob().getJob_id());
		response.setUser_id(savedApplication.getUser().getUser_id());
		response.setApplication_resume(savedApplication.getApplication_resume());
		response.setApplication_applied_on(savedApplication.getApplication_applied_on());
		response.setApplication_status(savedApplication.getApplication_status());
		
		return response;
		
	}
	
	//find all
//	public List<Application> getAllApplications() {
//		return applicationRepository.findAll();
//	}
	public List <ApplicationResponseDTO> getAllApplications() {
		List<Application> applications = applicationRepository.findAll();
		List <ApplicationResponseDTO> applicationlist = new ArrayList<>();
		
		for (Application application : applications) {
			ApplicationResponseDTO response = new ApplicationResponseDTO();
			
			response.setApplication_id(application.getApplication_id());
			response.setJob_id(application.getJob().getJob_id());
			response.setUser_id(application.getUser().getUser_id());
			response.setApplication_resume(application.getApplication_resume());
			response.setApplication_applied_on(application.getApplication_applied_on());
			response.setApplication_status(application.getApplication_status());
			
			applicationlist.add(response);
		}
		return applicationlist;
		
	}
	
	
	//find by Id
//	public Application getApplicationById(int id) {
//		return applicationRepository.findById(id).orElse(null);
//	}
	public ApplicationResponseDTO getApplicationById(int id) {
		Application application = applicationRepository.findById(id).orElse(null);
		if(application == null) {
			return null;
		}
		ApplicationResponseDTO response = new ApplicationResponseDTO();
		response.setApplication_id(application.getApplication_id());
		response.setJob_id(application.getJob().getJob_id());
		response.setUser_id(application.getUser().getUser_id());
		response.setApplication_resume(application.getApplication_resume());
		response.setApplication_applied_on(application.getApplication_applied_on());
		response.setApplication_status(application.getApplication_status());
		
		return response;
		
	}
	
	//update
	public ApplicationResponseDTO updateApplication(
	        int id,
	        ApplicationRequestDTO applicationRequestDTO) {

	    //find existing application
	    Application application = applicationRepository
	            .findById(id)
	            .orElse(null);

	    //application does not exist
	    if (application == null) {
	        return null;
	    }

	    //find user
	    User user = userRepository
	            .findById(applicationRequestDTO.getUser_id())
	            .orElse(null);

	    //user does not exist
	    if (user == null) {
	        return null;
	    }

	    //find job
	    Job job = jobRepository
	            .findById(applicationRequestDTO.getJob_id())
	            .orElse(null);

	    //job does not exist
	    if (job == null) {
	        return null;
	    }

	    //update application details
	    application.setUser(user);
	    application.setJob(job);
	    application.setApplication_resume(
	            applicationRequestDTO.getApplication_resume()
	    );
	    application.setApplication_applied_on(
	            applicationRequestDTO.getApplication_applied_on()
	    );
	    application.setApplication_status(
	            applicationRequestDTO.getApplication_status()
	    );

	    //save updated application
	    Application updatedApplication =
	            applicationRepository.save(application);

	    //convert entity to response DTO
	    ApplicationResponseDTO response =
	            new ApplicationResponseDTO();

	    response.setApplication_id(
	            updatedApplication.getApplication_id()
	    );
	    response.setUser_id(
	            updatedApplication.getUser().getUser_id()
	    );
	    response.setJob_id(
	            updatedApplication.getJob().getJob_id()
	    );
	    response.setApplication_resume(
	            updatedApplication.getApplication_resume()
	    );
	    response.setApplication_applied_on(
	            updatedApplication.getApplication_applied_on()
	    );
	    response.setApplication_status(
	            updatedApplication.getApplication_status()
	    );

	    return response;
	}
	//delete 
	public void deleteApplication(int id) {
		applicationRepository.deleteById(id);
	}
	// Get applications by user
	public List<ApplicationResponseDTO> getApplicationsByUser(int user_id) {

	    List<Application> applications =
	            applicationRepository.findByUserId(user_id);

	    List<ApplicationResponseDTO> applicationList =
	            new ArrayList<>();

	    for (Application application : applications) {

	        ApplicationResponseDTO response =
	                new ApplicationResponseDTO();

	        response.setApplication_id(
	                application.getApplication_id());

	        response.setUser_id(
	                application.getUser().getUser_id());

	        response.setJob_id(
	                application.getJob().getJob_id());

	        response.setApplication_resume(
	                application.getApplication_resume());

	        response.setApplication_applied_on(
	                application.getApplication_applied_on());

	        response.setApplication_status(
	                application.getApplication_status());

	        applicationList.add(response);
	    }

	    return applicationList;
	}


	// Get applications by job
	public List<ApplicationResponseDTO> getApplicationsByJob(int job_id) {

	    List<Application> applications =
	            applicationRepository.findByJobId(job_id);

	    List<ApplicationResponseDTO> applicationList =
	            new ArrayList<>();

	    for (Application application : applications) {

	        ApplicationResponseDTO response =
	                new ApplicationResponseDTO();

	        response.setApplication_id(
	                application.getApplication_id());

	        response.setUser_id(
	                application.getUser().getUser_id());

	        response.setJob_id(
	                application.getJob().getJob_id());

	        response.setApplication_resume(
	                application.getApplication_resume());

	        response.setApplication_applied_on(
	                application.getApplication_applied_on());

	        response.setApplication_status(
	                application.getApplication_status());

	        applicationList.add(response);
	    }

	    return applicationList;
	}
	
	
	
	
	
	
	
	
	
}
