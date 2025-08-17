// components/CreateTodoModal.tsx
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Todo } from "@/types/todo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, PlusCircle } from "lucide-react";
import { createTodo } from "@/service/todo";

type CreateTodoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (todo: Todo) => void;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export default function CreateTodoModal({ open, onOpenChange, todos, setTodos }: CreateTodoModalProps) {
  const [token, setToken] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (open) {
      const t = localStorage.getItem("token") || "";
      setToken(t);
      setTitle("");
      setDescription("");
      setErr(null);
    }
  }, [open]);

  const handleCreate = async () => {
    if (!formRef.current) return;
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    try {
      setIsLoading(true);
      setErr(null);
      const payload = {
        title: title.trim(),
        description: description.trim(),
      };
      const res = await createTodo(token, payload);
      todos.push(res.todo);
      setTodos(todos);
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const apiMsg = e?.response?.data?.message;
      setErr(apiMsg ?? e?.message ?? "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(v) => !isLoading && onOpenChange(v)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-violet-600" />
            Create a new task
          </DialogTitle>
          <DialogDescription>Add a clear title and (optionally) a short description.</DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="todo-title">Title</Label>
            <Input
              id="todo-title"
              placeholder="e.g., Ship v1 release notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              className="focus:border-violet-500 focus:ring-violet-500"
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="todo-description">
              Description <span className="text-gray-400 text-xs">(optional)</span>
            </Label>
            <Textarea
              id="todo-description"
              placeholder="Add a few details to help future you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[96px] focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          {/* Status */}

          {/* Error */}
          {err && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2">{err}</p>}
        </form>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-violet-600 hover:bg-violet-700 text-white"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating…
              </span>
            ) : (
              "Create task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
