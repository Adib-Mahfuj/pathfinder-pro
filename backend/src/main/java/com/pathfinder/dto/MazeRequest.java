package com.pathfinder.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// Data the frontend sends when saving a maze
public record MazeRequest(
        @NotBlank @Size(max = 100) String name,
        @NotNull @Min(1) @Max(100) Integer gridRows,
        @NotNull @Min(1) @Max(100) Integer gridCols,
        @NotNull @Min(0) Integer startRow,
        @NotNull @Min(0) Integer startCol,
        @NotNull @Min(0) Integer endRow,
        @NotNull @Min(0) Integer endCol,
        @NotBlank String walls) {
}