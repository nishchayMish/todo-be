import express from "express";
import cors from "cors";
import todoRoutes from "./modules/todo/todo.routes.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://todo-fe-rust.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/v1", todoRoutes);

export default app;