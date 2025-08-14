import express from "express";
import { createTodo, deleteTodo, getAll, updateTodo } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const todoRoute = express.Router();

todoRoute.get("/", authMiddleware, getAll);
todoRoute.post("/", authMiddleware, createTodo);
todoRoute.put("/:id", authMiddleware, updateTodo);
todoRoute.delete("/:id", authMiddleware, deleteTodo);

export default todoRoute;
