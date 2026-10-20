export type Status = "todo" | "wip" | "done";

export interface Task {
  id: string;
  title: string;
  status: Status;
}
