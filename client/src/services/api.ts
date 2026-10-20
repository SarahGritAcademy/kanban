import type { Status, Task } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

// Hjälpfunktion: plockar ut serverns eget felmeddelande, om det finns
async function readErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  const body = await response.json().catch(() => null);
  return body?.message ?? fallback;
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Kunde inte hämta uppgifterna")
    );
  }
  return response.json();
}

export async function createTask(title: string): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Kunde inte skapa uppgiften")
    );
  }
  return response.json();
}

export async function updateTaskStatus(
  id: string,
  status: Status
): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Kunde inte ändra uppgiften")
    );
  }
  return response.json();
}