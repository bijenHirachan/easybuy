import express from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
