package com.pathfinder.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.pathfinder.dto.MazeRequest;
import com.pathfinder.dto.MazeResponse;
import com.pathfinder.dto.MazeSummary;
import com.pathfinder.entity.Maze;
import com.pathfinder.repository.MazeRepository;

@Service
public class MazeService {

    private final MazeRepository repository;

    // Spring injects the repository automatically
    public MazeService(MazeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public MazeResponse create(MazeRequest req) {
        // Start and end must be inside the grid
        if (req.startRow() >= req.gridRows() || req.endRow() >= req.gridRows()
                || req.startCol() >= req.gridCols() || req.endCol() >= req.gridCols()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Start and end must be inside the grid");
        }

        Maze maze = new Maze();
        maze.setName(req.name().trim());
        maze.setGridRows(req.gridRows());
        maze.setGridCols(req.gridCols());
        maze.setStartRow(req.startRow());
        maze.setStartCol(req.startCol());
        maze.setEndRow(req.endRow());
        maze.setEndCol(req.endCol());
        maze.setWalls(req.walls());

        return toResponse(repository.save(maze));
    }

    @Transactional(readOnly = true)
    public List<MazeSummary> list() {
        return repository.findAllByOrderByCreatedAtDesc().stream()
                .map(m -> new MazeSummary(m.getId(), m.getName(), m.getCreatedAt()))
                .toList();
    }

    @Transactional(readOnly = true)
    public MazeResponse get(Long id) {
        return toResponse(find(id));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(find(id));
    }

    // Load a maze or answer with 404
    private Maze find(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Maze not found"));
    }

    // Convert an entity to the object sent to the frontend
    private MazeResponse toResponse(Maze m) {
        return new MazeResponse(m.getId(), m.getName(), m.getGridRows(), m.getGridCols(),
                m.getStartRow(), m.getStartCol(), m.getEndRow(), m.getEndCol(),
                m.getWalls(), m.getCreatedAt());
    }
}