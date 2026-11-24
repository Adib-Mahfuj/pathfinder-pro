import Node from "./Node";

export default function Grid({
  grid,
  start,
  end,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  return (
    <div
      className="inline-block select-none border border-slate-700"
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {grid.map((rowNodes, r) => (
        <div key={r} className="flex">
          {rowNodes.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              row={node.row}
              col={node.col}
              isWall={node.isWall}
              isStart={start.row === node.row && start.col === node.col}
              isEnd={end.row === node.row && end.col === node.col}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}