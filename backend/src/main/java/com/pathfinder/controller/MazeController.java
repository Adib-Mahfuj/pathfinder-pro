package com.pathfinder.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pathfinder.dto.MazeRequest;
import com.pathfinder.dto.MazeResponse;
import com.pathfinder.dto.MazeSummary;
import com.pathfinder.security.AuthUser;
import com.pathfinder.service.MazeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/mazes")
public class MazeController {

    private final MazeService service;

    public MazeController(MazeService service) {
        this.service = service;
    }

    // @AuthenticationPrincipal gives us the logged-in user taken from the token
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MazeResponse create(@AuthenticationPrincipal AuthUser user,
                               @Valid @RequestBody MazeRequest request) {
        return service.create(user.id(), request);
    }

    @GetMapping
    public List<MazeSummary> list(@AuthenticationPrincipal AuthUser user) {
        return service.list(user.id());
    }

    @GetMapping("/{id}")
    public MazeResponse get(@AuthenticationPrincipal AuthUser user, @PathVariable Long id) {
        return service.get(user.id(), id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal AuthUser user, @PathVariable Long id) {
        service.delete(user.id(), id);
    }
}