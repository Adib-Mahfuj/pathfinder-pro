package com.pathfinder.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

// The result of one algorithm run (used for the history page)
@Entity
@Table(name = "run_records")
public class RunRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who owns this record
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    // astar | dijkstra | bfs
    @Column(nullable = false, length = 20)
    private String algorithm;

    @Column(name = "visited_count", nullable = false)
    private int visitedCount;

    // 0 means no path was found
    @Column(name = "path_length", nullable = false)
    private int pathLength;

    @Column(name = "wall_count", nullable = false)
    private int wallCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

    public int getVisitedCount() {
        return visitedCount;
    }

    public void setVisitedCount(int visitedCount) {
        this.visitedCount = visitedCount;
    }

    public int getPathLength() {
        return pathLength;
    }

    public void setPathLength(int pathLength) {
        this.pathLength = pathLength;
    }

    public int getWallCount() {
        return wallCount;
    }

    public void setWallCount(int wallCount) {
        this.wallCount = wallCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}