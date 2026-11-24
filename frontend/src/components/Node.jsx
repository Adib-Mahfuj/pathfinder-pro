export default function Node({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  onMouseDown,
  onMouseEnter,
}) {
  let style = "bg-slate-800 border-slate-700";
  if (isStart) style = "bg-green-500 border-green-600";
  else if (isEnd) style = "bg-red-500 border-red-600";
  else if (isWall) style = "bg-slate-300 border-slate-300";

  return (
    <div
      className={`w-6 h-6 border ${style}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    />
  );
}