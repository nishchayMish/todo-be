import { pool } from "../../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0];
};

export const login = async (email, password) => {
    const user = await getUser(email);

    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw { status: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    delete user.password;
    return { token, user };
};

export const register = async (name, email, password) => {
    const existingUser = await getUser(email);

    if (existingUser) {
        throw { status: 400, message: "User already exists" };
    }

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    delete result.rows[0].password
    return result.rows[0];
};