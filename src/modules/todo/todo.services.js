import { pool } from "../../config/db.js"

export const getTodos = async () => {
    try {
        const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createTodos = async (title) => {
    try {
        const result = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [title]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteTodos = async (id) => {
    try {
        const result = await pool.query("DELETE FROM todos where id=$1 RETURNING *", [id])
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTodosStatus = async (id, completed) => {
    try {
        const result = await pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id])
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTodos = async (id, title) => {
    try {
        const result = await pool.query("UPDATE todos SET title = $1 WHERE id = $2 RETURNING *", [title, id]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}