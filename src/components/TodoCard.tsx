// components/TodoCard.tsx
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import type { Todo } from "@/types/todo";

type TodoCardProps = {
  todo: Todo;
  onToggleStatus?: (id: string, next: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
};

export default function TodoCard({ todo, onToggleStatus, onEdit, onDelete, className = "" }: TodoCardProps) {
  const next = !todo.status;

  return (
    <article
      className={`rounded-xl border bg-white p-4 shadow-sm hover:shadow ${className}`}
      aria-label={`Tâche: ${todo.title}`}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleStatus?.(todo.id, next)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {todo.status ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <h3 className="text-base font-semibold leading-tight">{todo.title}</h3>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
          ${todo.status ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
        >
          {todo.status ? "Finished" : "Not finished"}
        </span>
      </header>

      {todo.description && <p className="mt-2 text-sm text-gray-600">{todo.description}</p>}

      <footer className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit?.(todo.id)}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
          aria-label="Modifier la tâche"
          title="Modifier"
        >
          <Pencil className="h-4 w-4" />
          Modify
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(todo.id)}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm text-red-700 hover:bg-red-50"
          aria-label="Supprimer la tâche"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </footer>
    </article>
  );
}
