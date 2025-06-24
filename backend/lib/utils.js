import jwt from 'jsonwebtoken';

// Function to generate a token for the user
export const generateToken = (userId) => {
    const jwt_secret = process.env.JWT_SECRET;

    const token = jwt.sign({ userId }, jwt_secret);

    return token;
}