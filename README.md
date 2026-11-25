
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

## API Endpoints
| Method | URL | Description |
|---|---|---|
| GET | /api/health | Health check |
| POST | /api/mazes | Save a maze |
| GET | /api/mazes | List saved mazes |
| GET | /api/mazes/{id} | Load one maze |
| DELETE | /api/mazes/{id} | Delete a maze |
| POST | /api/runs | Save an algorithm run |
| GET | /api/runs | Latest 50 runs |

## Getting Started

```bash
cd frontend
npm install
npm run dev
```
