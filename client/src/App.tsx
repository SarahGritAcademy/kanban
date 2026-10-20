import { useEffect, useState } from "react";
import type { Status, Task } from "./types/task";
import { createTask, fetchTasks, updateTaskStatus } from "./services/api";
import { filterTasks } from "./utils/tasks";
import AddTaskForm from "./components/AddTaskForm";
import SearchBar from "./components/SearchBar";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleMove(id: string, status: Status) {
    try {
      const updated = await updateTaskStatus(id, status);
      setTasks((current) =>
        current.map((task) => (task.id === updated.id ? updated : task))
      );
      setActionError(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Något gick fel");
    }
  }

  async function handleAdd(title: string) {
    const created = await createTask(title);
    setTasks((current) => [...current, created]);
  }

  if (loading) return <p>Laddar kort...</p>;
  if (error) return <p>Något gick fel: {error}</p>;

  const visibleTasks = filterTasks(tasks, searchText);

  return (
    <main>
      <h1>Kanban</h1>

      <div className="toolbar">
        <AddTaskForm onAdd={handleAdd} />
        <SearchBar value={searchText} onChange={setSearchText} />
      </div>

      {actionError && <p role="alert">{actionError}</p>}

      {searchText.trim() !== "" && visibleTasks.length === 0 && (
        <p role="status">Inga kort matchar sökningen.</p>
      )}

      <Board tasks={visibleTasks} onMove={handleMove} />
    </main>
  );
}

export default App;