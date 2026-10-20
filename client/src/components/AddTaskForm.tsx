import { useState } from "react";
import type { FormEvent } from "react";

interface AddTaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSaving(true);
    setError(null);
    try {
      await onAdd(trimmed);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label htmlFor="new-task">Add new</label>
      <div className="field-row">
        <input
          id="new-task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ny uppgift..."
          maxLength={100}
          required
        />
        <button type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default AddTaskForm;