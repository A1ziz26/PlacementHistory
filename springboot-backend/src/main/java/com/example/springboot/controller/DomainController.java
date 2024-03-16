package com.example.springboot.controller;

import com.example.springboot.model.Domain;
import com.example.springboot.repository.DomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/domains")
public class DomainController {

    private final DomainRepository domainRepository;

    @Autowired
    public DomainController(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    @GetMapping
    public List<Domain> getAllCompanies() {
        return domainRepository.findAll();
    }
}
