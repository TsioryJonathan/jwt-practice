import express from "express";
import { getHelloWorld, getPong } from "../controllers/health-check.controller.js";

const healthCheckRoute = express.Router();

healthCheckRoute.get("/hello", getHelloWorld);
healthCheckRoute.get("/ping", getPong);

export default healthCheckRoute;
