import express from "express";
import cors from "cors";
import todoRoutes from "./modules/todo/todo.routes.js";
import userRoutes from "./modules/user/user.routes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://todo-fe-rust.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

export default app;