// fileService.js
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "src/api/data");

export async function readJsonFile(fileName) {
  try {
    const filePath = path.join(dataDir, fileName);
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.warn(`⚠️ File not found: ${fileName}, creating empty file...`);

    let defaultData = {};
    if (fileName === "users.json") defaultData = { users: [] };
    if (fileName === "todo.json") defaultData = { todos: [] };
    const filePath = path.join(dataDir, fileName);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf8");

    return defaultData;
  }
}

export async function writeJsonFile(data, fileName) {
  const filePath = path.join(dataDir, fileName);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
