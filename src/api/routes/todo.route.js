import express from "express";
import { createTodo, deleteTodo, getAll, updateTodo } from "../controllers/todo.controller.js";

const todoRoute = express.Router();

todoRoute.get("/", getAll);
todoRoute.post("/", createTodo);
todoRoute.put("/:id", updateTodo);
todoRoute.delete("/:id", deleteTodo);

export default todoRoute;
