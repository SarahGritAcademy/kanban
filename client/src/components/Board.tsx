import type { Status, Task } from "../types/task";
import { STATUSES } from "../constants/statuses";
import Column from "./Column";

interface BoardProps {
  tasks: Task[];
  onMove: (id: string, status: Status) => void;
}

function Board({ tasks, onMove }: BoardProps) {
  return (
    <div className="board">
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

export default Board;