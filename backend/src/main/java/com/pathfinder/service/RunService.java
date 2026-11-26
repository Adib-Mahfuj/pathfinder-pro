package com.pathfinder.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pathfinder.dto.RunRequest;
import com.pathfinder.dto.RunResponse;
import com.pathfinder.entity.RunRecord;
import com.pathfinder.repository.RunRecordRepository;
import com.pathfinder.repository.UserRepository;

@Service
public class RunService {

    private final RunRecordRepository repository;
    private final UserRepository userRepository;

    public RunService(RunRecordRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RunResponse create(Long userId, RunRequest req) {
        RunRecord run = new RunRecord();
        run.setOwner(userRepository.getReferenceById(userId));
        run.setAlgorithm(req.algorithm());
        run.setVisitedCount(req.visitedCount());
        run.setPathLength(req.pathLength());
        run.setWallCount(req.wallCount());
        return toResponse(repository.save(run));
    }

    @Transactional(readOnly = true)
    public List<RunResponse> latest(Long userId) {
        return repository.findTop50ByOwnerIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    private RunResponse toResponse(RunRecord r) {
        return new RunResponse(r.getId(), r.getAlgorithm(), r.getVisitedCount(),
                r.getPathLength(), r.getWallCount(), r.getCreatedAt());
    }
}