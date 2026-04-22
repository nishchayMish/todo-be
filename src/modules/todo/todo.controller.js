import {
    getTodos,
    createTodos,
    deleteTodos,
    updateTodosStatus,
    updateTodos,
} from "./todo.services.js";

export const getTodosController = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await getTodos(userId);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createTodoController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        const todo = await createTodos(title, req.user.id);
        res.json({
            message: "Todo created successfully",
            todo
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }
        await deleteTodos(id, userId)
        res.json({
            message: "Todo deleted successfully",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const toggleTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { completed } = req.body;
        if (!id) {
            res.json({
                "message": "invalid toggle"
            })
        }
        if (completed === undefined) {
            res.json({
                "message": "invalid toggle"
            })
        }
        await updateTodosStatus(id, completed, userId)

        res.json({
            message: "todo updated successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        await updateTodos(id, title, userId)
        res.json({
            message: "Todo updated successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}