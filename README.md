
# PathFinder Pro 🧭

An interactive pathfinding visualizer built with React and Spring Boot.
Draw walls, move start/end points, and watch A*, Dijkstra and BFS find the shortest path.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Spring Boot, Spring Security (JWT), Spring Data JPA
- **Database:** MySQL

## Features
- Interactive grid: draw walls, drag start/end nodes
- Algorithms: A*, Dijkstra, Breadth-First Search
- Animated search with visited nodes and shortest path
- Maze generator (Recursive Division) and random walls
- Adjustable animation speed

## Backend Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE pathfinder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Copy `backend/src/main/resources/application-local.properties.example`
   to `application-local.properties` and set your MySQL password.
3. Run the API:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
4. Check it works: http://localhost:8080/api/health

## Authentication
The API uses JWT. Register or log in to get a token, then send it with every request:
`Authorization: Bearer <token>`

Add a `app.jwt.secret` (at least 40 random characters) to `application-local.properties`.

## API Endpoints
| Method | URL | Auth | Description |
|---|---|---|---|
| GET | /api/health | No | Health check |
| POST | /api/auth/register | No | Create an account |
| POST | /api/auth/login | No | Log in and get a token |
| GET | /api/auth/me | Yes | Current user |
| POST | /api/mazes | Yes | Save a maze |
| GET | /api/mazes | Yes | List my mazes |
| GET | /api/mazes/{id} | Yes | Load one of my mazes |
| DELETE | /api/mazes/{id} | Yes | Delete one of my mazes |
| POST | /api/runs | Yes | Save an algorithm run |
| GET | /api/runs | Yes | My latest 50 runs |

## Getting Started

```bash
cd frontend
npm install
npm run dev
```
