import { nodeKey, getNeighbors, buildPath } from "./helpers";

// Breadth-First Search: explores level by level using a queue.
// On an unweighted grid it always finds the shortest path.
export function bfs(grid, start, end) {
  const startNode = grid[start.row][start.col];
  const endKey = `${end.row}-${end.col}`;

  const visitedInOrder = [];
  const cameFrom = new Map();
  const seen = new Set([nodeKey(startNode)]);
  const queue = [startNode];

  while (queue.length > 0) {
    const current = queue.shift();
    visitedInOrder.push(current);

    // Reached the end node
    if (nodeKey(current) === endKey) {
      return { visitedInOrder, path: buildPath(cameFrom, current) };
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const key = nodeKey(neighbor);
      if (!seen.has(key)) {
        seen.add(key);
        cameFrom.set(key, current);
        queue.push(neighbor);
      }
    }
  }

  // Queue is empty and the end was never reached: no path exists
  return { visitedInOrder, path: [] };
}