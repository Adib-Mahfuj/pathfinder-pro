import { ROWS, COLS } from "./constants";

// Creates an empty grid
export const createGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push({ row, col, isWall: false });
    }
    grid.push(currentRow);
  }
  return grid;
};

// Toggles a node's wall on/off and returns a new grid
// (React state should not be mutated directly, so a copy must be created)
export const setWall = (grid, row, col, value) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  newGrid[row] = newGrid[row].slice();
  newGrid[row][col] = { ...node, isWall: value };
  return newGrid;
};