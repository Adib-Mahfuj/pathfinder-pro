package com.pathfinder.dto;

import java.time.LocalDateTime;

public record RunResponse(
        Long id,
        String algorithm,
        int visitedCount,
        int pathLength,
        int wallCount,
        LocalDateTime createdAt) {
}