import { ROWS, COLS } from "../utils/constants";

// Unique string key for a node, used in Map and Set
export const nodeKey = (node) => `${node.row}-${node.col}`;

// Returns the non-wall neighbors (up, down, left, right) of a node
export const getNeighbors = (grid, node) => {
  const { row, col } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < COLS - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((n) => !n.isWall);
};

// Walks backwards from the end node using the cameFrom map
// and returns the path from start to end
export const buildPath = (cameFrom, endNode) => {
  const path = [];
  let current = endNode;

  while (current) {
    path.unshift(current);
    current = cameFrom.get(nodeKey(current));
  }

  return path;
};