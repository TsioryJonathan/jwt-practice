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
const PORT = process.env.PORT || 3000;

const ALLOWED_ORIGINS = ["http://localhost:5173", "https://jwt-todo-front.vercel.app"];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());

app.use(express.json());

app.use("/api/health-check", healthCheckRoute);
app.use("/api/todo", authMiddleware, todoRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", authMiddleware, userRoute);

app.use((err, req, res, next) => {
  console.error(err);
  if (err?.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS: origin not allowed" });
  }
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
