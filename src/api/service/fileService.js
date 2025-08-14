import { promises as fs } from "fs";
import path from "path";

export async function readJsonFile(filename) {
  const toRead = path.join(process.cwd(), "src", "api", "data", filename);
  try {
    const data = await fs.readFile(toRead, "utf8");
    return JSON.parse(data || "{}");
  } catch (err) {
    console.error(`Error reading ${toRead}:`, err);
    throw err;
  }
}

export async function writeJsonFile(jsonData, filename) {
  const toWrite = path.join(process.cwd(), "src", "api", "data", filename);
  try {
    await fs.mkdir(path.dirname(toWrite), { recursive: true });
    const jsonString = JSON.stringify(jsonData, null, 2);
    await fs.writeFile(toWrite, jsonString, "utf8");
  } catch (err) {
    console.error(`Error writing ${toWrite}:`, err);
    throw err;
  }
}
