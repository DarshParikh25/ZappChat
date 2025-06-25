import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from './lib/db.js'
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create express app and HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const sio = new Server(server, {
    cors: { origin: '*' }
})

// Store online users
export const userSocketMap = {}; // Stores in the form of: { userId: socketId }

// Socket.io connection handler
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('Connection established for: ', userId);

    if(userId) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users to all connected client
    io.emit('getOnlineUsers', Object.key(userSocketMap));

    socket.on('disconnect', () => {
        console.log('Connection broke from: ', userId);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

// Middlewares
app.use(express.json({ limit: '4mb' }));
app.use(cors());

// Routes
app.use('/api/status', (erq, res) => {
    res.send("Server is live!");
});
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter)

// Connect to MongoDB
await connectDB();

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("Server is running on port: ", port);
})