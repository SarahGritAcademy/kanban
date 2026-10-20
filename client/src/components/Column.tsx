import type { Status, Task } from "../types/task";
import { STATUS_LABELS } from "../constants/statuses";
import TaskCard from "./TaskCard";

interface ColumnProps {
  status: Status;
  tasks: Task[];
  onMove: (id: string, status: Status) => void;
}

function Column({ status, tasks, onMove }: ColumnProps) {
  return (
    <section
      className={`column column-${status}`}
      aria-labelledby={`column-title-${status}`}
    >
      <h2 id={`column-title-${status}`} className="column-title">
        {STATUS_LABELS[status]}
      </h2>
      <ul className="column-body">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMove} />
        ))}
      </ul>
    </section>
  );
}

export default Column;