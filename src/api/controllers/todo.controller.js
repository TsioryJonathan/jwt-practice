import { readJsonFile, writeJsonFile } from "../service/fileService.js";
import { randomUUID } from "crypto";

export const getAll = async (req, res) => {
  try {
    const { sub: userId } = req.user;
    const data = await readJsonFile("todo.json");
    const usersTodo = data.todos.filter((todo) => todo.userId == userId);
    res.status(200).json(usersTodo);
  } catch (err) {
    res.status(400).json({
      message: "An error occured",
    });
    console.error(err);
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const { sub: userId, username } = req.user;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields required: title, description" });
  }

  try {
    const data = await readJsonFile("todo.json");
    const toAdd = {
      id: randomUUID(),
      userId,
      username,
      title,
      description,
      createdAt: Date.now(),
      status: false,
    };
    data.todos.push(toAdd);
    await writeJsonFile(data, "todo.json");

    res.json({
      message: "Succes",
      todo: toAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readJsonFile("todo.json");
    const foundIndex = data.todos.findIndex((el) => el.id == id);

    if (foundIndex == -1)
      return res.json({
        message: "Todo not found",
      });

    data.todos[foundIndex] = {
      ...data.todos[foundIndex],
      ...req.body,
      createdAt: Date.now(),
    };
    await writeJsonFile(data, "todo.json");
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
    const data = await readJsonFile("todo.json");
    data.todos = data.todos.filter((todo) => todo.id != id);
    await writeJsonFile(data, "todo.json");
    res.json({
      message: "Succesfully deleted",
      todos: data.todos,
    });
  } catch (error) {
    console.error(err);
  }
};
