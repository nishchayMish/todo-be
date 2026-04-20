import express from "express";
import cors from "cors";
import todoRoutes from "./modules/todo/todo.routes.js";
import userRoutes from "./modules/user/user.routes.js"
const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://todo-fe-rust.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

export default app;