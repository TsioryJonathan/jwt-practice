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
  const isDone = !!todo.status;
  const next = !isDone;

  const chip = isDone
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <article
      className={[
        "relative overflow-hidden rounded-2xl border border-gray-200 bg-white/95",
        "p-6 sm:p-7 shadow-sm transition hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-violet-500",
        className,
      ].join(" ")}
      aria-label={`Task: ${todo.title}`}
    >
      {/* Accent bar */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-1.5 ${
          isDone ? "bg-emerald-400" : "bg-gradient-to-b from-violet-500 to-fuchsia-500"
        }`}
      />

      {/* Header: user + status */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Avatar initials */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white text-sm font-bold shadow-sm"
            title={todo.username}
            aria-hidden
          >
            {initials(todo.username)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-gray-900">{todo.username}</div>
            <div className="text-xs text-gray-500">Assigned</div>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs sm:text-sm font-medium ${chip}`}
        >
          {isDone ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Finished
            </>
          ) : (
            <>
              <Circle className="h-4 w-4" />
              Open
            </>
          )}
        </span>
      </header>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900">{todo.title}</h3>

      {/* Description */}
      {todo.description && (
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600 line-clamp-4" title={todo.description}>
          {todo.description}
        </p>
      )}

      {/* Footer actions */}
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {/* Toggle status */}
        <button
          type="button"
          onClick={() => onToggleStatus?.(todo.id, next)}
          className={[
            "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition",
            isDone
              ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              : "border-violet-200 text-violet-700 hover:bg-violet-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          ].join(" ")}
          aria-pressed={isDone}
          aria-label={isDone ? "Mark as open" : "Mark as done"}
          title={isDone ? "Mark as open" : "Mark as done"}
        >
          {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
          {isDone ? "Mark as open" : "Mark as done"}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(todo.id)}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Edit task"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Modify</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(todo.id)}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Delete task"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </footer>
    </article>
  );
}

/* Helpers */
function initials(name?: string) {
  if (!name) return "U";
  const cleaned = name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\\s._-]/g, " ").trim();
  const parts = cleaned.split(/[\\s._-]+/).filter(Boolean);

  if (parts.length === 1) {
    const w = parts[0];
    const a = w[0]?.toUpperCase() ?? "U";
    const b = w[1]?.toUpperCase() ?? "";
    return (a + b).trim() || "U";
  }

  const first = parts[0][0]?.toUpperCase() ?? "";
  const last = parts[parts.length - 1][0]?.toUpperCase() ?? "";
  return (first + last).trim() || "U";
}
