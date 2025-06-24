import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";

import { connectDB } from './lib/db.js'

// Create express app and HTTP Server
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use('/api/status', (erq, res) => {
    res.send("Server is live!");
});

// Connect to MongoDB
await connectDB();

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("Server is running on port: ", port);
})