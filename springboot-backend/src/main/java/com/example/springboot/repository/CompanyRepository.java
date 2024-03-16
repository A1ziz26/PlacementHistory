package com.example.springboot.repository;
import com.example.springboot.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface CompanyRepository extends JpaRepository<Company,Long> {
}
