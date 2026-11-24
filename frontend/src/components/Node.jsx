export default function Node({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
}) {
  // Pick colors based on the node type (higher entries win)
  let style = "bg-slate-800 border-slate-700";
  if (isStart) style = "bg-green-500 border-green-600";
  else if (isEnd) style = "bg-red-500 border-red-600";
  else if (isWall) style = "bg-slate-300 border-slate-300";
  else if (isPath) style = "bg-yellow-400 border-yellow-500 animate-path";
  else if (isVisited) style = "bg-cyan-500 border-cyan-600 animate-visited";

  return (
    <div
      className={`w-6 h-6 border ${style}`}
      onMouseDown={(e) => {
        // Prevent the browser's native text/drag selection
        e.preventDefault();
        onMouseDown(row, col);
      }}
      onMouseEnter={() => onMouseEnter(row, col)}
    />
  );
}