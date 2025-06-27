import jwt from 'jsonwebtoken';

import User from "../models/user.js";

// Middlewares to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const jwt_secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwt_secret);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.json({
                success: false,
                message: 'User not found!'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("auth error: ", error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}