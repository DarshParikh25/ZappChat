import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { generateToken } from '../lib/utils.js';

// Register a new user
const signUp = async (req, res) => {
    const { name, email, password, bio } = req.body;

    try {
        if(!name) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide your full name!'
            })
        } else if(!email) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide your email address!'
            })
        } else if(!bio) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide your profile bio!'
            })
        } else if(!password) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide the password!'
            })
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.json({
                success: false,
                message: 'Already already exists! Please log in to your account.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPass,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully!"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Log In an existing user
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide your email address!'
            })
        } else if(!password) {
            return res.json({
                success: false,
                message: 'Missing credentials! Please provide your password!'
            })
        }

        const userData = await User.findOne({ email });

        const isPassCorrect = await bcrypt.compare(password, userData.password);

        if(!isPassCorrect) {
            return res.json({
                success: false,
                message: 'Invalid credentials! Please provide correct password!'
            })
        }

        const token = generateToken(userData._id);

        res.json({
            success: true,
            token,
            message: 'Successfully logged in!'
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Controller to check the user's authentication status


export default {
    signUp,
    logIn
};