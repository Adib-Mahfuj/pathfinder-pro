package com.pathfinder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pathfinder.dto.AuthResponse;
import com.pathfinder.dto.LoginRequest;
import com.pathfinder.dto.RegisterRequest;
import com.pathfinder.dto.UserResponse;
import com.pathfinder.security.AuthUser;
import com.pathfinder.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return service.login(request);
    }

    // Returns the currently logged-in user (the frontend uses this to restore a session)
    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal AuthUser user) {
        return service.me(user.id());
    }
}