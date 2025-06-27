import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

// Register a new user
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

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
                message: 'User already exists! Please log in to your account.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPass
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "Account created successfully!"
        })
    } catch (error) {
        console.log("sign up error: ", error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Log In an existing user
export const logIn = async (req, res) => {
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

        if(userData === null) {
            return res.json({
                success: false,
                message: 'User does not exists. Please register first!'
            })
        }

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
        });
    } catch (error) {
        console.log("login error: ", error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
}

// Controller to check the user's authentication status
export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}

// Update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, name } = req.body;
        const userId = req.user._id;

        let updatedUser;

        if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, name }, { new: true });
        } else {
            const uploadImage = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadImage.secure_url, bio, name }, { new: true });
        }
        res.json({
            success: true,
            user: updatedUser,
            message: 'Successfully updated the profile details!'
        })
    } catch (error) {
        console.log("update profile error: ", error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}