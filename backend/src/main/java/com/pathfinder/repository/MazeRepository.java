package com.pathfinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pathfinder.entity.Maze;

public interface MazeRepository extends JpaRepository<Maze, Long> {

    // Only the mazes of one user, newest first
    List<Maze> findAllByOwnerIdOrderByCreatedAtDesc(Long ownerId);

    // A maze is found only if it belongs to that user
    Optional<Maze> findByIdAndOwnerId(Long id, Long ownerId);
}