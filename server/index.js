import express from "express";
import cors from "cors";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = new URL("./data/tasks.json", import.meta.url);
const VALID_STATUSES = ["todo", "wip", "done"];

app.use(cors());
app.use(express.json());

async function loadTasks() {
  const text = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(text);
}

async function saveTasks(tasks) {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Hämta alla kort
app.get("/api/tasks", async (req, res) => {
  try {
    res.json(await loadTasks());
  } catch (error) {
    res.status(500).json({ message: "Kunde inte läsa uppgifterna" });
  }
});

// Skapa ett nytt kort (hamnar alltid i TO DO)
app.post("/api/tasks", async (req, res) => {
  try {
    const rawTitle = req.body?.title;
    const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
    if (!title) {
      return res.status(400).json({ message: "Titeln får inte vara tom" });
    }

    const tasks = await loadTasks();
    const newTask = { id: randomUUID(), title, status: "todo" };
    tasks.push(newTask);
    await saveTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte spara uppgiften" });
  }
});

// Ändra status på ett kort
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const status = req.body?.status;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Ogiltig status" });
    }

    const tasks = await loadTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Uppgiften hittades inte" });
    }

    task.status = status;
    await saveTasks(tasks);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte ändra uppgiften" });
  }
});

app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});