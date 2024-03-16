package com.example.springboot.controller;

import com.example.springboot.model.User;
import com.example.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    List<User> getAllUsers(
            @RequestParam(name = "year", required = false) Long year,
            @RequestParam(name = "company", required = false) String company,
            @RequestParam(name = "domain", required = false) String domain
    ) {
        if (year != null && company != null && !company.isEmpty() && domain != null && !domain.isEmpty()) {
            return userRepository.findByYearAndCompanyAndDomain(year, company, domain);
        } else if (year != null && company != null && !company.isEmpty()) {
            return userRepository.findByYearAndCompany(year, company);
        } else if (year != null && domain != null && !domain.isEmpty()) {
            return userRepository.findByYearAndDomain(year, domain);
        } else if (company != null && !company.isEmpty() && domain != null && !domain.isEmpty()) {
            return userRepository.findByCompanyAndDomain(company, domain);
        } else if (year != null) {
            return userRepository.findByYear(year);
        } else if (company != null && !company.isEmpty()) {
            return userRepository.findByCompany(company);
        } else if (domain != null && !domain.isEmpty()) {
            return userRepository.findByDomain(domain);
        } else {
            return userRepository.findAll();
        }
    }
    @GetMapping("/placedStudents")
    List<User> getPlacedStudentsByCompany(
            @RequestParam(name = "company") String company
    ) {
        return userRepository.findPlacedStudentsByCompany(company);
    }
}
