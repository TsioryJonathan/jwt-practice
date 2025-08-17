import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTodo, getTodo } from "@/service/todo";
import type { Todo } from "@/types/todo";
import { AlertTriangle, ArrowBigLeft, Filter, Loader2, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import TodoCard from "@/components/TodoCard";
import { getUsername } from "@/service/userInfo";
import { Button } from "./ui/button";
import CreateTodoModal from "./CreateTodoModal";

type StatusFilter = "all" | "open" | "done";

export default function TodoPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<StatusFilter>("all");

  const [filteredTodo, setFilteredTodo] = useState<Todo[] | []>([]);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setToken(token);
    const fetch = async () => {
      const username = await getUsername(token);
      setUsername(username.username);
    };
    fetch();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getTodo(token);
        setTodos(Array.isArray(data) ? data : []);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status == "all") setFilteredTodo(todos);
    else if (status == "done") setFilteredTodo(todos.filter((todo) => todo.status == true));
    else if (status == "open") setFilteredTodo(todos.filter((todo) => todo.status == false));
  }, [status, todos]);

  const handleDelete = async (id: string) => {
    const res = await deleteTodo(token, id);
    setTodos(res);
  };
  // Loading
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center gap-3 text-gray-700">
        <Loader2 className="animate-spin" size={28} />
        <p>Loading tasks…</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={28} />
          <p className="font-medium">{error}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-gray-200 text-gray-900 px-4 py-2">
            <ArrowBigLeft size={16} />
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <CreateTodoModal open={open} onOpenChange={setOpen} todos={todos} setTodos={setTodos} />

      {/* Toolbar */}
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <div className="flex w-full justify-between">
          <p className="text-4xl mb-5">
            Welcome back <span className="text-violet-700 font-bold">{username}</span>
          </p>

          <Button onClick={() => setOpen(true)} className="flex items-center justify-center">
            <Plus />
            Create a todo
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center  gap-10">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-10">
            <span className="inline-flex items-center gap-2 text-xl text-gray-100">
              <Filter className="h-4 w-4" /> Filters
            </span>

            <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 bg-white">
              {(["all", "open", "done"] as StatusFilter[]).map((s) => (
                <button key={s} onClick={() => setStatus(s)} className={cnSegment(status === s)}>
                  {s === "all" ? "All" : s === "open" ? "Open" : "Done"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mt-4 text-xl text-gray-100">
          {filteredTodo.length} task{filteredTodo.length !== 1 ? "s" : ""} shown
        </div>

        {/* List */}
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTodo.map((t) => (
              <div key={t.id}>
                <TodoCard todo={t} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cnSegment(active: boolean) {
  return [
    "px-3 py-2 text-sm transition-colors cursor-pointer hover:bg-purple-200",
    active ? "bg-violet-600 text-white" : "text-gray-700 hover:bg-gray-50",
  ].join(" ");
}
