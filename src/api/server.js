import express from "express";
import cors from "cors";
import healthCheckRoute from "./routes/health-check.route.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use("/api/health-check", healthCheckRoute);

app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
