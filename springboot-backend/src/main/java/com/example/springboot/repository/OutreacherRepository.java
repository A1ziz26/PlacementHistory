package com.example.springboot.repository;

import com.example.springboot.model.Outreacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OutreacherRepository extends JpaRepository<Outreacher, Long> {
    Optional<Outreacher> findByUsername(String username);
}
