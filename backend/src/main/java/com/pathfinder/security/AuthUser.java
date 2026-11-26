package com.pathfinder.security;

// The logged-in user, taken from the token. Controllers receive this object.
public record AuthUser(Long id, String email) {
}