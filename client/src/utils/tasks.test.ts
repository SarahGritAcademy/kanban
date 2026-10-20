import { describe, it, expect } from "@jest/globals";
import type { Task } from "../types/task";
import { filterTasks, getOtherStatuses } from "./tasks";

const tasks: Task[] = [
  { id: "1", title: "Skissa wireframes", status: "done" },
  { id: "2", title: "Bygga backend", status: "wip" },
  { id: "3", title: "Skriva tester", status: "todo" },
];

describe("getOtherStatuses", () => {
  it("ger wip och done för ett kort i todo", () => {
    expect(getOtherStatuses("todo")).toEqual(["wip", "done"]);
  });

  it("ger todo och done för ett kort i wip", () => {
    expect(getOtherStatuses("wip")).toEqual(["todo", "done"]);
  });

  it("ger todo och wip för ett kort i done", () => {
    expect(getOtherStatuses("done")).toEqual(["todo", "wip"]);
  });
});

describe("filterTasks", () => {
  it("returnerar alla kort när sökrutan är tom", () => {
    expect(filterTasks(tasks, "")).toEqual(tasks);
  });

  it("returnerar alla kort när sökningen bara är mellanslag", () => {
    expect(filterTasks(tasks, "   ")).toEqual(tasks);
  });

  it("hittar kort oavsett stora och små bokstäver", () => {
    expect(filterTasks(tasks, "BYGGA")).toEqual([tasks[1]]);
  });

  it("hittar kort på en del av titeln", () => {
    expect(filterTasks(tasks, "wire")).toEqual([tasks[0]]);
  });

  it("returnerar en tom lista när inget matchar", () => {
    expect(filterTasks(tasks, "xyz")).toEqual([]);
  });
});