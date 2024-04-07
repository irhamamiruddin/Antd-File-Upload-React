import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import formRouter from './routes/formData';
import fileUploadRouter from './routes/fileUpload';

const PORT = 5000;
const MONGOSTR = 'mongodb://127.0.0.1:27017/Irham';
const app = express();
const server = new http.Server(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json()); // Middleware to parse JSON body
app.use(cors({ origin: "*" })); // Allow all origins

// Express routes
app.use('/api/form', formRouter);
app.use('/api/uploads', fileUploadRouter);

// Connect to MongoDB
mongoose.connect(MONGOSTR).then(() => {
    console.log('MongoDB connected');
    // Start the server
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Socket.io connection
io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




