import express from "express";
import { getUsername } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", getUsername);

export default userRoute;
