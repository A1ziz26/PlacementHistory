package com.example.springboot.service;

import com.example.springboot.model.Outreacher;
import com.example.springboot.repository.OutreacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OutreacherService {
    @Autowired
    private OutreacherRepository outreacherRepository;
    public Optional<Outreacher> login(String username, String password) {
        return outreacherRepository.findByUsername(username)
                .filter(outreacher -> outreacher.getPassword().equals(password));
    }
}
