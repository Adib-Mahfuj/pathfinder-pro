package com.pathfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pathfinder.entity.Maze;

// JpaRepository already gives save, findById, findAll, deleteById, etc.
public interface MazeRepository extends JpaRepository<Maze, Long> {

    // Spring builds the SQL from the method name: newest first
    List<Maze> findAllByOrderByCreatedAtDesc();
}