import jwt from 'jsonwebtoken';

import User from "../models/user.js";

// Middlewares to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        // Check if token is missing
        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Token missing!'
            });
        }

        const jwt_secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwt_secret);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }

        req.user = user; // Critical for checkAuth

        next();
    } catch (error) {
        console.log("auth error: ", error.message);
        res.status(403).json({
            success: false,
            message: error.message
        })
    }
}