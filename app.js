import express from "express";
import cors from "cors";
import { userRouter  } from "./routes/userRoutes.js";

const app = express();

// 1. Middlewares
app.use(express.json());
app.use(cors()); //enable all cors request

// 2. Routes
app.use("/api/v1/users", userRouter);

export { app };
