import Node from "./Node";

export default function Grid({
  grid,
  start,
  end,
  visited,
  pathSet,
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
          {rowNodes.map((node) => {
            const key = `${node.row}-${node.col}`;
            return (
              <Node
                key={key}
                row={node.row}
                col={node.col}
                isWall={node.isWall}
                isStart={start.row === node.row && start.col === node.col}
                isEnd={end.row === node.row && end.col === node.col}
                isVisited={visited.has(key)}
                isPath={pathSet.has(key)}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}