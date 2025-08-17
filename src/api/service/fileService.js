import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(process.cwd(), "src/api/data");

export async function readJsonFile(filename) {
  try {
    const filePath = path.join(dataDir, filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(`⚠️ File not found: ${filename}, returning empty object`);
      return { users: [] };
    }
    throw err;
  }
}

export async function writeJsonFile(data, filename) {
  const filePath = path.join(dataDir, filename);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
