import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTodo } from "@/service/todo";
import type { Todo } from "@/types/todo";
import { AlertTriangle, ArrowBigLeft, Loader2 } from "lucide-react";
import TodoCard from "./TodoCard";
import Navbar from "./Navbar";

function TodoPage() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTodos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }
      try {
        setIsLoading(true);
        const data = await getTodo(token);
        setTodoList(Array.isArray(data) ? data : []);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("An error occured");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center gap-5">
        <Loader2 className="animate-spin" size={48} />
        <p>Loading tasks ... </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
        <div className="flex flex-row gap-10 justify-center items-center">
          <AlertTriangle className="text-red-500" size={48} />
          <p>An error occured</p>
        </div>
        <button className="bg-gray-800 px-10 py-3 rounded-lg ">
          <Link to="/" className="flex gap-10">
            Go back <ArrowBigLeft />
          </Link>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <Navbar />
      {todoList.length === 0 ? <p>No availables tasks</p> : todoList.map((todo) => <TodoCard todo={todo} />)}
    </div>
  );
}

export default TodoPage;
