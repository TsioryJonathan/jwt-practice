import { promises as fs } from "fs";
import path from "path";

const filename = path.join(process.cwd(), "src", "api", "data", "todo.json");

export async function readJsonFile() {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data || "{}");
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    throw err;
  }
}

export async function writeJsonFile(jsonData) {
  try {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    const jsonString = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(filename, jsonString, "utf8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    throw err;
  }
}
