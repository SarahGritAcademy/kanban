import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import { fetchTasks } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Laddar kort...</p>;
  if (error) return <p>Något gick fel: {error}</p>;

  return (
    <main>
      <h1>Kanban</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.status})
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;