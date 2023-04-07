import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);

export default app;

app.use(ErrorMiddleware);
