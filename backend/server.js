import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from './lib/db.js'
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create express app and HTTP Server
const app = express();
const server = http.createServer(app);

const isProd = process.env.NODE_ENV === 'production'

// Initialize socket.io server
export const sio = new Server(server, {
    cors: { 
        origin: isProd
            ? ["http://localhost:5173"]
            : ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        credentials: true
    }
})

// Store online users
export const userSocketMap = {}; // Stores in the form of: { userId: socketId }

// Socket.io connection handler
sio.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('Connection established for: ', userId);

    if(userId) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users to all connected client
    sio.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('Connection broke from: ', userId);
        delete userSocketMap[userId];
        sio.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

// Middlewares
app.use(express.json({ limit: '4mb' }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

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



// http://localhost:5000/api/auth/google/callback