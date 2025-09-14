import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import roomRouter from "./routes/room.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use("/api/v1/user", userRouter);

app.use("/api/v1/room", roomRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
