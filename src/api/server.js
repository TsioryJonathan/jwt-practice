import express from "express";
import cors from "cors";
import healthCheckRoute from "./routes/health-check.route.js";
import todoRoute from "./routes/todo.route.js";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.server") });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/health-check", healthCheckRoute);
app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
