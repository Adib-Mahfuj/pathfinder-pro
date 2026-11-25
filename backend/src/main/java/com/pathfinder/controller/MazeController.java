package com.pathfinder.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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
import com.pathfinder.service.MazeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/mazes")
public class MazeController {

    private final MazeService service;

    public MazeController(MazeService service) {
        this.service = service;
    }

    // @Valid checks the rules written in MazeRequest (invalid data gives 400)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MazeResponse create(@Valid @RequestBody MazeRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<MazeSummary> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public MazeResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}