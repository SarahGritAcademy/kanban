import type { Status, Task } from "../types/task";
import { STATUS_LABELS } from "../constants/statuses";
import { getOtherStatuses } from "../utils/tasks";

interface TaskCardProps {
  task: Task;
  onMove: (id: string, status: Status) => void;
}

function TaskCard({ task, onMove }: TaskCardProps) {
  return (
    <li className="task-card">
      <h3>{task.title}</h3>
      <div className="task-actions">
        {getOtherStatuses(task.status).map((target) => (
          <button
            key={target}
            type="button"
            className={`status-button status-button-${target}`}
            aria-label={`Flytta ${task.title} till ${STATUS_LABELS[target]}`}
            onClick={() => onMove(task.id, target)}
          >
            {STATUS_LABELS[target]}
          </button>
        ))}
      </div>
    </li>
  );
}

export default TaskCard;