package com.example.springboot.repository;

import com.example.springboot.model.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepository extends JpaRepository<Domain,Long> {
}
