import { useState, useRef, useEffect } from "react";
import Grid from "./components/Grid";
import { createGrid, setWall } from "./utils/grid";
import { START, END } from "./utils/constants";
import { nodeKey } from "./algorithms/helpers";
import { bfs } from "./algorithms/bfs";
import { dijkstra } from "./algorithms/dijkstra";
import { astar } from "./algorithms/astar";
import { recursiveDivisionWalls, randomWalls } from "./utils/maze";

// Available algorithms and their functions
const ALGORITHMS = {
  astar: { label: "A* Search", run: astar },
  dijkstra: { label: "Dijkstra", run: dijkstra },
  bfs: { label: "Breadth-First Search", run: bfs },
};

// Delay (in ms) between two visited nodes
const SPEEDS = {
  fast: { label: "Fast", delay: 4 },
  normal: { label: "Normal", delay: 12 },
  slow: { label: "Slow", delay: 30 },
};

// Delay (in ms) between two nodes of the final path
const PATH_DELAY = 35;

// Delay (in ms) between two walls while a maze is being built
const MAZE_DELAY = 6;

export default function App() {
  const [grid, setGrid] = useState(createGrid);
  const [start, setStart] = useState(START);
  const [end, setEnd] = useState(END);

  // Animation state
  const [visited, setVisited] = useState(new Set());
  const [pathSet, setPathSet] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null); // { visitedCount, pathLength }

  // Controls
  const [algorithm, setAlgorithm] = useState("astar");
  const [speed, setSpeed] = useState("normal");

  // What the mouse is doing right now: 'start' | 'end' | 'draw' | 'erase' | null
  // useRef is used so changing it does not trigger a re-render
  const dragMode = useRef(null);

  // Holds all pending animation timers so we can cancel them
  const timers = useRef([]);

  const isStart = (r, c) => start.row === r && start.col === c;
  const isEnd = (r, c) => end.row === r && end.col === c;

  // Schedule a function and remember the timer id
  const schedule = (fn, delay) => {
    timers.current.push(setTimeout(fn, delay));
  };

  const cancelTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Cancel timers when the component unmounts
  useEffect(() => cancelTimers, []);

  // Remove the visited/path colors and the result text
  const clearVisuals = () => {
    cancelTimers();
    setVisited(new Set());
    setPathSet(new Set());
    setResult(null);
    setIsRunning(false);
  };

  const hasVisuals = visited.size > 0 || result !== null;

  const visualize = () => {
    if (isRunning) return;
    clearVisuals();

    // Run the selected algorithm instantly, then replay the result slowly
    const { visitedInOrder, path } = ALGORITHMS[algorithm].run(
      grid,
      start,
      end,
    );
    const delay = SPEEDS[speed].delay;

    setIsRunning(true);

    // 1) Animate the visited nodes one by one
    visitedInOrder.forEach((node, i) => {
      schedule(() => {
        setVisited((prev) => new Set(prev).add(nodeKey(node)));
      }, i * delay);
    });

    // 2) Animate the shortest path after all visited nodes are shown
    const pathStart = visitedInOrder.length * delay + 200;
    path.forEach((node, i) => {
      schedule(
        () => {
          setPathSet((prev) => new Set(prev).add(nodeKey(node)));
        },
        pathStart + i * PATH_DELAY,
      );
    });

    // 3) Unlock the grid and show the result
    schedule(
      () => {
        setResult({
          visitedCount: visitedInOrder.length,
          pathLength: path.length,
        });
        setIsRunning(false);
      },
      pathStart + path.length * PATH_DELAY + 100,
    );
  };

  const handleMouseDown = (row, col) => {
    if (isRunning) return; // grid is locked during the animation
    if (hasVisuals) clearVisuals(); // editing invalidates the old result

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
    if (!mode || isRunning) return;

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

  // Remove all walls and any visualization
  const clearWalls = () => {
    clearVisuals();
    setGrid(createGrid());
  };

  // Reset walls, visualization and move start/end back to the defaults
  const resetAll = () => {
    clearVisuals();
    setGrid(createGrid());
    setStart(START);
    setEnd(END);
  };

  // Build a maze or random walls, one wall at a time (animated)
  const generateMaze = (type) => {
    if (isRunning) return;
    clearVisuals();

    // Start from an empty grid
    setGrid(createGrid());

    const allWalls =
      type === "maze" ? recursiveDivisionWalls() : randomWalls(0.3);

    // Never put a wall on the start or end node
    const walls = allWalls.filter(([r, c]) => !isStart(r, c) && !isEnd(r, c));

    // Lock the grid, add walls one by one, then unlock
    setIsRunning(true);
    walls.forEach(([r, c], i) => {
      schedule(() => setGrid((g) => setWall(g, r, c, true)), i * MAZE_DELAY);
    });
    schedule(() => setIsRunning(false), walls.length * MAZE_DELAY + 50);
  };

  const btn =
    "px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed";
  const select =
    "px-3 py-2 rounded bg-slate-800 border border-slate-600 disabled:opacity-50";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">PathFinder Pro 🧭</h1>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
          className={select}
        >
          {Object.entries(ALGORITHMS).map(([key, a]) => (
            <option key={key} value={key}>
              {a.label}
            </option>
          ))}
        </select>

        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={isRunning}
          className={select}
        >
          {Object.entries(SPEEDS).map(([key, s]) => (
            <option key={key} value={key}>
              Speed: {s.label}
            </option>
          ))}
        </select>

        <button
          onClick={visualize}
          disabled={isRunning}
          className={`${btn} bg-blue-600 hover:bg-blue-500 font-semibold`}
        >
          {isRunning ? "Running..." : "Visualize"}
        </button>

        <button
          onClick={clearVisuals}
          disabled={isRunning || !hasVisuals}
          className={`${btn} bg-slate-700 hover:bg-slate-600`}
        >
          Clear Path
        </button>
        <button
          onClick={clearWalls}
          disabled={isRunning}
          className={`${btn} bg-slate-700 hover:bg-slate-600`}
        >
          Clear Walls
        </button>
        <button
          onClick={resetAll}
          disabled={isRunning}
          className={`${btn} bg-slate-700 hover:bg-slate-600`}
        >
          Reset
        </button>
        <button
          onClick={() => generateMaze("maze")}
          disabled={isRunning}
          className={`${btn} bg-purple-600 hover:bg-purple-500`}
        >
          Generate Maze
        </button>
        <button
          onClick={() => generateMaze("random")}
          disabled={isRunning}
          className={`${btn} bg-purple-600 hover:bg-purple-500`}
        >
          Random Walls
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-300">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-500 inline-block" /> Start
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-red-500 inline-block" /> End
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-slate-300 inline-block" /> Wall
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-cyan-500 inline-block" /> Visited
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-yellow-400 inline-block" /> Shortest path
        </span>
      </div>

      <div className="overflow-x-auto">
        <Grid
          grid={grid}
          start={start}
          end={end}
          visited={visited}
          pathSet={pathSet}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
      </div>

      {/* Result */}
      <div className="mt-4 h-6 text-sm">
        {result && result.pathLength > 0 && (
          <span className="text-slate-200">
            Visited: <b>{result.visitedCount}</b> nodes &nbsp;|&nbsp; Path:{" "}
            <b>{result.pathLength}</b> nodes
          </span>
        )}
        {result && result.pathLength === 0 && (
          <span className="text-red-400">
            No path found. Visited {result.visitedCount} nodes.
          </span>
        )}
        {!result && (
          <span className="text-slate-400">
            Click and drag to draw walls. Drag the green and red nodes to move
            them.
          </span>
        )}
      </div>
    </div>
  );
}
