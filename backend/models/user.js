import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    profilePic: {
        type: String,
        default: ''
    },
    bio: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.models.User || model('User', userSchema);

export default User;