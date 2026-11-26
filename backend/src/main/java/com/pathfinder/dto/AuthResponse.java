package com.pathfinder.dto;

// Sent after register/login: the token plus basic user info
public record AuthResponse(String token, UserResponse user) {
}