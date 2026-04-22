import { pool } from "../../config/db.js"

export const getTodos = async (userId) => {
    try {
        const result = await pool.query("SELECT * FROM todos WHERE user_id = $1 ORDER BY id DESC", [userId]);
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createTodos = async (title, userId) => {
    try {
        const result = await pool.query("INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *", [title, userId]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteTodos = async (id, userId) => {
    try {
        const result = await pool.query("DELETE FROM todos where id=$1 AND user_id = $2 RETURNING *", [id, userId])
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTodosStatus = async (id, completed, userId) => {
    try {
        const result = await pool.query("UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [completed, id, userId])
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTodos = async (id, title, userId) => {
    try {
        const result = await pool.query("UPDATE todos SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [title, id, userId]);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}