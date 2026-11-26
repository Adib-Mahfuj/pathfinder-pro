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

// A saved grid layout: size, start/end positions and the wall cells
@Entity
@Table(name = "mazes")
public class Maze {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who owns this record
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    @Column(nullable = false, length = 100)
    private String name;

    // "rows" is a reserved word in MySQL 8, so the columns are named
    // grid_rows/grid_cols
    @Column(name = "grid_rows", nullable = false)
    private int gridRows;

    @Column(name = "grid_cols", nullable = false)
    private int gridCols;

    @Column(name = "start_row", nullable = false)
    private int startRow;

    @Column(name = "start_col", nullable = false)
    private int startCol;

    @Column(name = "end_row", nullable = false)
    private int endRow;

    @Column(name = "end_col", nullable = false)
    private int endCol;

    // Wall cells stored as a JSON text such as [[5,5],[5,6]].
    // The frontend creates and reads this text, the backend only stores it.
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String walls;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Set the creation time automatically before the first save
    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGridRows() {
        return gridRows;
    }

    public void setGridRows(int gridRows) {
        this.gridRows = gridRows;
    }

    public int getGridCols() {
        return gridCols;
    }

    public void setGridCols(int gridCols) {
        this.gridCols = gridCols;
    }

    public int getStartRow() {
        return startRow;
    }

    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public int getStartCol() {
        return startCol;
    }

    public void setStartCol(int startCol) {
        this.startCol = startCol;
    }

    public int getEndRow() {
        return endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    public int getEndCol() {
        return endCol;
    }

    public void setEndCol(int endCol) {
        this.endCol = endCol;
    }

    public String getWalls() {
        return walls;
    }

    public void setWalls(String walls) {
        this.walls = walls;
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