import express from "express"
import {
    createTodoController,
    deleteTodo,
    getTodosController,
    toggleTodo,
    updateTodo,
} from "./todo.controller.js";

const router = express.Router();

router.get("/todos", getTodosController);
router.post("/todos", createTodoController)
router.delete("/todos/:id", deleteTodo)
router.patch("/todos/:id", toggleTodo)
router.put("/todos/:id", updateTodo)

export default router;