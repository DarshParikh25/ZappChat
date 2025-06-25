import express from 'express';
import { signUp, logIn, updateProfile, checkAuth } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/login', logIn);
userRouter.put('/update-profile', protectRoute, updateProfile);
userRouter.get('/check', protectRoute, checkAuth);

export default userRouter;