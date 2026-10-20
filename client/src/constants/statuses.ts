import type { Status } from "../types/task";

export const STATUSES: Status[] = ["todo", "wip", "done"];

export const STATUS_LABELS: Record<Status, string> = {
  todo: "TO DO",
  wip: "WIP",
  done: "DONE",
};