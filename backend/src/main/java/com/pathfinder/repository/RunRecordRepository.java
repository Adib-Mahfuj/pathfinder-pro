package com.pathfinder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pathfinder.entity.RunRecord;

public interface RunRecordRepository extends JpaRepository<RunRecord, Long> {

    // The latest 50 runs of one user, newest first
    List<RunRecord> findTop50ByOwnerIdOrderByCreatedAtDesc(Long ownerId);
}