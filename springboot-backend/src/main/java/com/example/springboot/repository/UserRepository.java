package com.example.springboot.repository;

import com.example.springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByYearAndCompanyAndDomain(Long year, String company, String domain);

    List<User> findByYearAndCompany(Long year, String company);

    List<User> findByYearAndDomain(Long year, String domain);

    List<User> findByCompanyAndDomain(String company, String domain);

    List<User> findByYear(Long year);

    List<User> findByCompany(String company);

    List<User> findByDomain(String domain);
    @Query("SELECT u FROM User u WHERE u.company = :company AND u.year <> 2023 AND u.Status = 'placed'")
    List<User> findPlacedStudentsByCompany(String company);
}
