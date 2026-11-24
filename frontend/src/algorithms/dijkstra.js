import { nodeKey, getNeighbors, buildPath } from "./helpers";

// Dijkstra: always expands the node with the smallest known distance.
// Every step costs 1 here, so it behaves like BFS. It becomes different
// from BFS once we add weighted nodes later.
export function dijkstra(grid, start, end) {
  const startNode = grid[start.row][start.col];
  const endKey = `${end.row}-${end.col}`;

  const visitedInOrder = [];
  const cameFrom = new Map();
  const distance = new Map([[nodeKey(startNode), 0]]);
  const closed = new Set();
  const open = [startNode];

  while (open.length > 0) {
    // Pick the node in "open" with the smallest distance
    let bestIndex = 0;
    for (let i = 1; i < open.length; i++) {
      if (distance.get(nodeKey(open[i])) < distance.get(nodeKey(open[bestIndex]))) {
        bestIndex = i;
      }
    }
    const current = open.splice(bestIndex, 1)[0];
    const currentKey = nodeKey(current);

    // Skip nodes that were already finalized
    if (closed.has(currentKey)) continue;
    closed.add(currentKey);
    visitedInOrder.push(current);

    if (currentKey === endKey) {
      return { visitedInOrder, path: buildPath(cameFrom, current) };
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const neighborKey = nodeKey(neighbor);
      if (closed.has(neighborKey)) continue;

      const newDistance = distance.get(currentKey) + 1; // each step costs 1
      if (!distance.has(neighborKey) || newDistance < distance.get(neighborKey)) {
        distance.set(neighborKey, newDistance);
        cameFrom.set(neighborKey, current);
        open.push(neighbor);
      }
    }
  }

  return { visitedInOrder, path: [] };
}