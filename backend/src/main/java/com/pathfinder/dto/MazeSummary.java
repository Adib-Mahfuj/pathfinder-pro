package com.pathfinder.dto;

import java.time.LocalDateTime;

// Short version for the list (no wall data, so the list stays light)
public record MazeSummary(Long id, String name, LocalDateTime createdAt) {
}