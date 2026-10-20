import type { Status, Task } from "../types/task";
import { STATUSES } from "../constants/statuses";

export function getOtherStatuses(status: Status): Status[] {
  return STATUSES.filter((s) => s !== status);
}

export function filterTasks(tasks: Task[], searchText: string): Task[] {
  const query = searchText.trim().toLowerCase();
  if (query === "") return tasks;
  return tasks.filter((task) => task.title.toLowerCase().includes(query));
}