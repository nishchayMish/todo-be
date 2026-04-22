import {
    getUser,
    login,
    register
} from "./user.services.js";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const { token, user } = await login(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })

        delete user.role;

        return res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
};


export const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        })
    }
    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        })
    }
    if (!password) {
        return res.status(400).json({
            message: "Password is required"
        })
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        })
    }
    const user = await getUser(email)
    if (user) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await register(name, email, hashedPassword);

        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const logoutController = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expiresIn: new Date(0),
            path: "/"
        })
        return res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        console.log(error)
    }
}