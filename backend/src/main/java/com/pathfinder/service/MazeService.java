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
import com.pathfinder.repository.UserRepository;

@Service
public class MazeService {

    private final MazeRepository repository;
    private final UserRepository userRepository;

    public MazeService(MazeRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Transactional
    public MazeResponse create(Long userId, MazeRequest req) {
        // Start and end must be inside the grid
        if (req.startRow() >= req.gridRows() || req.endRow() >= req.gridRows()
                || req.startCol() >= req.gridCols() || req.endCol() >= req.gridCols()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Start and end must be inside the grid");
        }

        Maze maze = new Maze();
        // getReferenceById links the owner by id without loading the whole user
        maze.setOwner(userRepository.getReferenceById(userId));
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
    public List<MazeSummary> list(Long userId) {
        return repository.findAllByOwnerIdOrderByCreatedAtDesc(userId).stream()
                .map(m -> new MazeSummary(m.getId(), m.getName(), m.getCreatedAt()))
                .toList();
    }

    @Transactional(readOnly = true)
    public MazeResponse get(Long userId, Long id) {
        return toResponse(find(userId, id));
    }

    @Transactional
    public void delete(Long userId, Long id) {
        repository.delete(find(userId, id));
    }

    // Someone else's maze gives 404 too, so its existence is not revealed
    private Maze find(Long userId, Long id) {
        return repository.findByIdAndOwnerId(id, userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Maze not found"));
    }

    private MazeResponse toResponse(Maze m) {
        return new MazeResponse(m.getId(), m.getName(), m.getGridRows(), m.getGridCols(),
                m.getStartRow(), m.getStartCol(), m.getEndRow(), m.getEndCol(),
                m.getWalls(), m.getCreatedAt());
    }
}