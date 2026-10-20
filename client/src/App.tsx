import { useEffect, useState } from "react";
import type { Status, Task } from "./types/task";
import { fetchTasks, updateTaskStatus } from "./services/api";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

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

  if (loading) return <p>Laddar kort...</p>;
  if (error) return <p>Något gick fel: {error}</p>;

  return (
    <main>
      <h1>Kanban</h1>
      {actionError && <p role="alert">{actionError}</p>}
      <Board tasks={tasks} onMove={handleMove} />
    </main>
  );
}

export default App;