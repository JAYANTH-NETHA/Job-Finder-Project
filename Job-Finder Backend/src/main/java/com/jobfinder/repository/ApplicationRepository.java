package com.jobfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobfinder.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    @Query("SELECT a FROM Application a WHERE a.user.user_id = :userId")
    List<Application> findByUserId(@Param("userId") int userId);

    @Query("SELECT a FROM Application a WHERE a.job.job_id = :jobId")
    List<Application> findByJobId(@Param("jobId") int jobId);
}