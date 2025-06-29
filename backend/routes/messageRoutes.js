import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getUsersToChat, getMessages, seenMessage, sendMessage } from '../controllers/messageController.js'

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getUsersToChat);
messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.put('/mark/:id', protectRoute, seenMessage);
messageRouter.post('/send/:id', protectRoute, sendMessage);

export default messageRouter;