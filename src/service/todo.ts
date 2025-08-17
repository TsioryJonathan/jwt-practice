// service/todo.ts
import axios from "axios";
import axiosInstance from "@/lib/axios-instance";
import type { Todo } from "@/types/todo";

export const getTodo = async (token: string) => {
  try {
    const res = await axiosInstance.get<Todo[]>("/api/todo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!Array.isArray(res.data)) {
      throw new Error("Format de réponse invalide: attendu un tableau");
    }
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiMsg = (err.response?.data as any)?.message || err.message || "Erreur réseau";
      if (status === 401) {
        throw new Error(`Unauthorized: ${apiMsg}`);
      }
      throw new Error(apiMsg);
    }
  }
};

export const createTodo = async (token: string, todo: { title: string; description: string }) => {
  try {
    const res = await axiosInstance.post(
      "/api/todo",
      {
        title: todo.title,
        description: todo.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (token: string, id: string) => {
  if (!token || !id) {
    console.error("Required parameters");
    return;
  }
  try {
    const res = await axiosInstance.delete(`/api/todo/${id.toString().trim()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.todos;
  } catch (error) {
    console.error(error);
  }
};
