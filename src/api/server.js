import express from "express";
import cors from "cors";
import healthCheckRoute from "./routes/health-check.route.js";
import todoRoute from "./routes/todo.route.js";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import path from "path";
import userRoute from "./routes/user.route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.server") });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/health-check", healthCheckRoute);
app.use("/api/todo", authMiddleware, todoRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", authMiddleware, userRoute);

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
