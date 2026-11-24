import { ROWS, COLS } from "./constants";

// Random integer between min and max (both included)
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Pick one random item from an array
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Recursive Division maze.
// Returns a list of [row, col] wall cells in the order they are built.
//
// Rule that keeps every gap open: walls are only placed on ODD
// rows/columns, and gaps are only made on EVEN rows/columns.
// So a later wall can never block an earlier gap.
export function recursiveDivisionWalls() {
  const walls = [];

  const divide = (rowStart, rowEnd, colStart, colEnd) => {
    const height = rowEnd - rowStart + 1;
    const width = colEnd - colStart + 1;

    // Possible wall positions (odd indexes, with space on both sides)
    const wallRows = [];
    for (let r = rowStart + 1; r < rowEnd; r += 2) wallRows.push(r);
    const wallCols = [];
    for (let c = colStart + 1; c < colEnd; c += 2) wallCols.push(c);

    // Area is too small to divide
    if (wallRows.length === 0 && wallCols.length === 0) return;

    // Prefer cutting the longer side so the rooms stay roughly square
    let horizontal;
    if (wallRows.length === 0) horizontal = false;
    else if (wallCols.length === 0) horizontal = true;
    else if (height !== width) horizontal = height > width;
    else horizontal = Math.random() < 0.5;

    if (horizontal) {
      const r = pick(wallRows);
      // Gap must be on an even column
      const gap = colStart + 2 * randInt(0, Math.floor((colEnd - colStart) / 2));
      for (let c = colStart; c <= colEnd; c++) {
        if (c !== gap) walls.push([r, c]);
      }
      divide(rowStart, r - 1, colStart, colEnd); // area above the wall
      divide(r + 1, rowEnd, colStart, colEnd); // area below the wall
    } else {
      const c = pick(wallCols);
      // Gap must be on an even row
      const gap = rowStart + 2 * randInt(0, Math.floor((rowEnd - rowStart) / 2));
      for (let r = rowStart; r <= rowEnd; r++) {
        if (r !== gap) walls.push([r, c]);
      }
      divide(rowStart, rowEnd, colStart, c - 1); // area left of the wall
      divide(rowStart, rowEnd, c + 1, colEnd); // area right of the wall
    }
  };

  divide(0, ROWS - 1, 0, COLS - 1);
  return walls;
}

// Random walls: each cell becomes a wall with the given probability.
// The list is shuffled so the walls appear all over the grid while animating.
export function randomWalls(density = 0.3) {
  const walls = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (Math.random() < density) walls.push([r, c]);
    }
  }

  // Fisher-Yates shuffle
  for (let i = walls.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }
  return walls;
}