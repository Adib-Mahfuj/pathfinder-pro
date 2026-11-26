package com.pathfinder.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pathfinder.dto.RunRequest;
import com.pathfinder.dto.RunResponse;
import com.pathfinder.security.AuthUser;
import com.pathfinder.service.RunService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/runs")
public class RunController {

    private final RunService service;

    public RunController(RunService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RunResponse create(@AuthenticationPrincipal AuthUser user,
                              @Valid @RequestBody RunRequest request) {
        return service.create(user.id(), request);
    }

    @GetMapping
    public List<RunResponse> latest(@AuthenticationPrincipal AuthUser user) {
        return service.latest(user.id());
    }
}