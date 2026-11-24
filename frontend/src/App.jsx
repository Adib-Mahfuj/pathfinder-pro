import { useState, useRef } from "react";
import Grid from "./components/Grid";
import { createGrid, setWall } from "./utils/grid";
import { START, END } from "./utils/constants";
import { bfs } from "./algorithms/bfs";
import { dijkstra } from "./algorithms/dijkstra";
import { astar } from "./algorithms/astar";

export default function App() {
  const [grid, setGrid] = useState(createGrid);
  const [start, setStart] = useState(START);
  const [end, setEnd] = useState(END);

  // What the mouse is doing right now: 'start' | 'end' | 'draw' | 'erase' | null
  // useRef is used so changing it does not trigger a re-render
  const dragMode = useRef(null);

  const isStart = (r, c) => start.row === r && start.col === c;
  const isEnd = (r, c) => end.row === r && end.col === c;

  const handleMouseDown = (row, col) => {
    if (isStart(row, col)) {
      dragMode.current = "start";
    } else if (isEnd(row, col)) {
      dragMode.current = "end";
    } else {
      // If the node is already a wall, erase it; otherwise draw a wall
      const mode = grid[row][col].isWall ? "erase" : "draw";
      dragMode.current = mode;
      setGrid((g) => setWall(g, row, col, mode === "draw"));
    }
  };

  const handleMouseEnter = (row, col) => {
    const mode = dragMode.current;
    if (!mode) return;

    if (mode === "start") {
      if (isEnd(row, col)) return;
      setStart({ row, col });
      // Remove a wall if the start node is dragged onto it
      setGrid((g) => (g[row][col].isWall ? setWall(g, row, col, false) : g));
    } else if (mode === "end") {
      if (isStart(row, col)) return;
      setEnd({ row, col });
      // Remove a wall if the end node is dragged onto it
      setGrid((g) => (g[row][col].isWall ? setWall(g, row, col, false) : g));
    } else {
      // Do not draw or erase on the start/end nodes
      if (isStart(row, col) || isEnd(row, col)) return;
      setGrid((g) => setWall(g, row, col, mode === "draw"));
    }
  };

  const handleMouseUp = () => {
    dragMode.current = null;
  };

  // Remove all walls but keep start/end where they are
  const clearWalls = () => setGrid(createGrid());

  // Reset walls and move start/end back to the default positions
  const resetAll = () => {
    setGrid(createGrid());
    setStart(START);
    setEnd(END);
  };

  // Temporary: runs all algorithms and prints results in the console
  const testAlgorithms = () => {
    const algorithms = [
      ["BFS", bfs],
      ["Dijkstra", dijkstra],
      ["A*", astar],
    ];
    algorithms.forEach(([name, run]) => {
      const { visitedInOrder, path } = run(grid, start, end);
      console.log(
        name,
        "| visited:",
        visitedInOrder.length,
        "| path length:",
        path.length,
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">PathFinder Pro 🧭</h1>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={clearWalls}
          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600"
        >
          Clear Walls
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600"
        >
          Reset
        </button>
        <button
          onClick={testAlgorithms}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
        >
          Test (console)
        </button>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-green-500 inline-block" /> Start
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-red-500 inline-block" /> End
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 bg-slate-300 inline-block" /> Wall
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Grid
          grid={grid}
          start={start}
          end={end}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Click and drag to draw walls. Drag the green and red nodes to move them.
      </p>
    </div>
  );
}
