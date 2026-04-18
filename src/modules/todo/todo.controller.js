import {
    getTodos,
    createTodos,
    deleteTodos,
    updateTodosStatus,
    updateTodos,
} from "./todo.services.js";

export const getTodosController = async (req, res) => {
    try {
        const todos = await getTodos();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createTodoController = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        const todo = await createTodos(title);
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
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }
        await deleteTodos(id)
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
        await updateTodosStatus(id, completed)

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
        await updateTodos(id, title)
        res.json({
            message: "Todo updated successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}