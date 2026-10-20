import type { Status } from "../types/task";
import { STATUSES } from "../constants/statuses";

export function getOtherStatuses(status: Status): Status[] {
  return STATUSES.filter((s) => s !== status);
}