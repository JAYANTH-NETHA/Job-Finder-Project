package com.jobfinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobfinder.entity.Company;

public interface CompanyRepository extends JpaRepository<Company,Integer>{

}
