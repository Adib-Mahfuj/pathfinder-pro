package com.pathfinder.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

// Data the frontend sends after each visualization
public record RunRequest(
        @NotNull @Pattern(regexp = "astar|dijkstra|bfs") String algorithm,
        @NotNull @Min(0) Integer visitedCount,
        @NotNull @Min(0) Integer pathLength,
        @NotNull @Min(0) Integer wallCount) {
}