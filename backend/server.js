import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";

import { connectDB } from './lib/db.js'
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create express app and HTTP Server
const app = express();
const server = http.createServer(app);

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