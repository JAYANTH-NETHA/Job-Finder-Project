package com.jobfinder.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jobfinder.dto.CompanyRequestDTO;
import com.jobfinder.dto.CompanyResponseDTO;
import com.jobfinder.entity.Company;
import com.jobfinder.repository.CompanyRepository;

@Service
public class CompanyService {
	private final CompanyRepository companyRepository;
	
	public CompanyService (CompanyRepository companyRepository) {
		this.companyRepository = companyRepository;
	}
	//save
//	public Company saveCompany(Company company) {
//		return companyRepository.save(company);
//	}
	public CompanyResponseDTO saveCompany(CompanyRequestDTO companyRequestDTO) {
		Company company = new Company();
		company.setCompany_name(companyRequestDTO.getCompany_name());
		company.setCompany_location(companyRequestDTO.getCompany_location());
		company.setCompany_description(companyRequestDTO.getCompany_description());
		company.setCompany_website(companyRequestDTO.getCompany_website());
		
		Company savedCompany = companyRepository.save(company);
		CompanyResponseDTO response = new CompanyResponseDTO();
		
		response.setCompany_id(savedCompany.getCompany_id());
		response.setCompany_name(savedCompany.getCompany_name());
		response.setCompany_location(savedCompany.getCompany_location());
		response.setCompany_description(savedCompany.getCompany_description());
		response.setCompany_website(savedCompany.getCompany_website());
		
		return response;
		
		
	}
	//findAll
//	public List<Company> getAllCompanies() {
//		return companyRepository.findAll();
//	}
	public List<CompanyResponseDTO> getAllCompanies() {
		List<Company> companies = companyRepository.findAll();
		List <CompanyResponseDTO> responseList = new ArrayList<>();
		
		for (Company company : companies) {
			CompanyResponseDTO response = new CompanyResponseDTO();
			
			response.setCompany_id(company.getCompany_id());
			response.setCompany_name(company.getCompany_name());
			response.setCompany_location(company.getCompany_location());
			response.setCompany_description(company.getCompany_description());
			response.setCompany_website(company.getCompany_website());
			
			responseList.add(response);
		}
		
		return responseList;
	}
	
	
	
	//findById with.else(null)
//	public Company getCompanyById(int id) {
//		return companyRepository.findById(id).orElse(null);
//	}
	public CompanyResponseDTO getCompanyById(int id) {
		
		Company company = companyRepository.findById(id).orElse(null);
		
		if (company == null) {
			return null;
		}
		
		CompanyResponseDTO response = new CompanyResponseDTO();
		response.setCompany_id(company.getCompany_id());
		response.setCompany_name(company.getCompany_name());
		response.setCompany_location(company.getCompany_location());
		response.setCompany_description(company.getCompany_description());
		response.setCompany_website(company.getCompany_website());
		
		return response;
		
	}
	
	
	//Delete Company
	public void deleteCompany (int id) {
		companyRepository.deleteById(id);
	}
	
	// Update company
	public CompanyResponseDTO updateCompany(int id, CompanyRequestDTO companyRequestDTO) {

	    Company company = companyRepository.findById(id).orElse(null);

	    if (company == null) {
	        return null;
	    }

	    company.setCompany_name(companyRequestDTO.getCompany_name());
	    company.setCompany_location(companyRequestDTO.getCompany_location());
	    company.setCompany_description(companyRequestDTO.getCompany_description());
	    company.setCompany_website(companyRequestDTO.getCompany_website());

	    Company updatedCompany = companyRepository.save(company);

	    CompanyResponseDTO response = new CompanyResponseDTO();

	    response.setCompany_id(updatedCompany.getCompany_id());
	    response.setCompany_name(updatedCompany.getCompany_name());
	    response.setCompany_location(updatedCompany.getCompany_location());
	    response.setCompany_description(updatedCompany.getCompany_description());
	    response.setCompany_website(updatedCompany.getCompany_website());

	    return response;
	}

	
}

