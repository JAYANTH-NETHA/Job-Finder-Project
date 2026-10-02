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

import com.jobfinder.dto.CompanyRequestDTO;
import com.jobfinder.dto.CompanyResponseDTO;
import com.jobfinder.service.CompanyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/companies")
public class CompanyController {
	private final CompanyService companyService;
	
	public CompanyController (CompanyService companyService) {
		this.companyService = companyService;
	}
	
//	@PostMapping
//	public CompanyResponseDTO saveCompany(@RequestBody CompanyRequestDTO companyRequestDTO) {
//		return companyService.saveCompany(companyRequestDTO);
//	}
	@PostMapping
	public CompanyResponseDTO saveCompany(
	        @Valid @RequestBody CompanyRequestDTO companyRequestDTO) {

	    return companyService.saveCompany(companyRequestDTO);
	}
	
	@GetMapping
	public List<CompanyResponseDTO> getAllCompanies() {
		return companyService.getAllCompanies();
	}
	
	@GetMapping("/{id}")
	public CompanyResponseDTO getCompanyById(@PathVariable int id) {
		return companyService.getCompanyById(id);
	}
	
	// Update company
//	@PutMapping("/{id}")
//	public CompanyResponseDTO updateCompany(
//	        @PathVariable int id,
//	        @RequestBody CompanyRequestDTO companyRequestDTO) {
//
//	    return companyService.updateCompany(id, companyRequestDTO);
//	}
	@PutMapping("/{id}")
	public CompanyResponseDTO updateCompany(
	        @PathVariable int id,
	        @Valid @RequestBody CompanyRequestDTO companyRequestDTO) {

	    return companyService.updateCompany(id, companyRequestDTO);
	}

	@DeleteMapping("/{id}")
	public String deleteCompanyById(@PathVariable int id) {
		companyService.deleteCompany(id);
		return "Company Controller Successfull";
	}
	
}
