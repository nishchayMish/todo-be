import express from "express"
import {
    createTodoController,
    deleteTodo,
    getTodosController,
    toggleTodo,
    updateTodo,
} from "./todo.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/todos", verifyToken, getTodosController);
router.post("/todos", verifyToken, createTodoController)
router.delete("/todos/:id", verifyToken, deleteTodo)
router.patch("/todos/:id", verifyToken, toggleTodo)
router.put("/todos/:id", verifyToken, updateTodo)

export default router;