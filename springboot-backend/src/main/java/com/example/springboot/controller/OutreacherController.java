package com.example.springboot.controller;

import com.example.springboot.model.Outreacher;
import com.example.springboot.service.OutreacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class OutreacherController {
    @Autowired
    private OutreacherService outreacherService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<Outreacher> outreacher = outreacherService.login(username, password);

        return outreacher.map(o -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"));
    }
}
