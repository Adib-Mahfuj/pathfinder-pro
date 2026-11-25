package com.pathfinder.dto;

import java.time.LocalDateTime;

// Full maze data (used when loading one maze)
public record MazeResponse(
        Long id,
        String name,
        int gridRows,
        int gridCols,
        int startRow,
        int startCol,
        int endRow,
        int endCol,
        String walls,
        LocalDateTime createdAt) {
}