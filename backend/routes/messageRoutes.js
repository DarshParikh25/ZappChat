import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getUsersToChat, getMessages, seenMessage } from '../controllers/messageController.js'

const messageRouter = express.Router();

messageRouter.get('/user', protectRoute, getUsersToChat);
messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.put('mark/:id', protectRoute, seenMessage);

export default messageRouter;