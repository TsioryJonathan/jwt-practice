import { readJsonFile, writeJsonFile } from "../service/fileService.js";
import { randomUUID } from "crypto";

export const getAll = async (_req, res) => {
  try {
    const data = await readJsonFile();
    res.json(data.todos);
  } catch (err) {
    console.error(err);
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields required: id, title, description" });
  }

  try {
    const data = await readJsonFile();
    data.todos.push({
      id: randomUUID(),
      title,
      description,
    });
    await writeJsonFile(data);
    res.json({
      message: "Succes",
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readJsonFile();
    const foundIndex = data.todos.findIndex((el) => el.id == id);

    if (foundIndex == -1)
      return res.json({
        message: "Todo not found",
      });

    data.todos[foundIndex] = {
      ...data.todos[foundIndex],
      ...req.body,
    };
    await writeJsonFile(data);
    res.json({
      message: "Succesfully updated",
      Todo: data.todos[foundIndex],
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await readJsonFile();
    data.todos = data.todos.filter((todo) => todo.id != id);
    await writeJsonFile(data);
    res.json({
      message: "Succesfully deleted",
      todos: data.todos,
    });
  } catch (error) {
    console.error(err);
  }
};
