package com.jobfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobfinder.entity.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {

    // Search by title
    @Query("""
        SELECT j FROM Job j
        WHERE LOWER(j.job_title) LIKE LOWER(CONCAT('%', :title, '%'))
    """)
    List<Job> findByJob_titleContainingIgnoreCase(
            @Param("title") String title);


    // Search by location
    @Query("""
        SELECT j FROM Job j
        WHERE LOWER(j.job_location) LIKE LOWER(CONCAT('%', :location, '%'))
    """)
    List<Job> findByJob_locationContainingIgnoreCase(
            @Param("location") String location);


    // Combined search/filter
    @Query("""
        SELECT j FROM Job j
        WHERE (:title IS NULL OR LOWER(j.job_title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:location IS NULL OR LOWER(j.job_location) LIKE LOWER(CONCAT('%', :location, '%')))
        AND (:jobType IS NULL OR LOWER(j.job_type) LIKE LOWER(CONCAT('%', :jobType, '%')))
        AND (:experience IS NULL OR LOWER(j.job_experience) LIKE LOWER(CONCAT('%', :experience, '%')))
        AND (:minSalary IS NULL OR j.job_salary >= :minSalary)
        AND (:maxSalary IS NULL OR j.job_salary <= :maxSalary)
    """)
    List<Job> searchJobs(
            @Param("title") String title,
            @Param("location") String location,
            @Param("jobType") String jobType,
            @Param("experience") String experience,
            @Param("minSalary") Double minSalary,
            @Param("maxSalary") Double maxSalary
    );
    @Query("SELECT j FROM Job j ORDER BY j.job_salary ASC")
    List<Job> sortBySalaryAsc();

    @Query("SELECT j FROM Job j ORDER BY j.job_salary DESC")
    List<Job> sortBySalaryDesc();

    @Query("SELECT j FROM Job j ORDER BY j.job_posted_on DESC")
    List<Job> sortByNewest();

    @Query("SELECT j FROM Job j ORDER BY j.job_posted_on ASC")
    List<Job> sortByOldest();
}