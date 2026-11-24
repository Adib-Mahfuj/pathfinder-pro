import { nodeKey, getNeighbors, buildPath } from "./helpers";

// Heuristic: Manhattan distance (fits a grid where we move in 4 directions)
const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

// A*: like Dijkstra, but picks the node with the smallest f = g + h,
// where g = distance from start and h = estimated distance to the end.
// This pulls the search toward the target, so it visits fewer nodes.
export function astar(grid, start, end) {
  const startNode = grid[start.row][start.col];
  const endNode = grid[end.row][end.col];
  const endKey = nodeKey(endNode);

  const visitedInOrder = [];
  const cameFrom = new Map();
  const g = new Map([[nodeKey(startNode), 0]]);
  const f = new Map([[nodeKey(startNode), heuristic(startNode, endNode)]]);
  const closed = new Set();
  const open = [startNode];

  while (open.length > 0) {
    // Pick the node with the smallest f (ties: smaller heuristic wins)
    let bestIndex = 0;
    for (let i = 1; i < open.length; i++) {
      const fi = f.get(nodeKey(open[i]));
      const fb = f.get(nodeKey(open[bestIndex]));
      if (
        fi < fb ||
        (fi === fb && heuristic(open[i], endNode) < heuristic(open[bestIndex], endNode))
      ) {
        bestIndex = i;
      }
    }
    const current = open.splice(bestIndex, 1)[0];
    const currentKey = nodeKey(current);

    if (closed.has(currentKey)) continue;
    closed.add(currentKey);
    visitedInOrder.push(current);

    if (currentKey === endKey) {
      return { visitedInOrder, path: buildPath(cameFrom, current) };
    }

    for (const neighbor of getNeighbors(grid, current)) {
      const neighborKey = nodeKey(neighbor);
      if (closed.has(neighborKey)) continue;

      const newG = g.get(currentKey) + 1; // each step costs 1
      if (!g.has(neighborKey) || newG < g.get(neighborKey)) {
        g.set(neighborKey, newG);
        f.set(neighborKey, newG + heuristic(neighbor, endNode));
        cameFrom.set(neighborKey, current);
        open.push(neighbor);
      }
    }
  }

  return { visitedInOrder, path: [] };
}