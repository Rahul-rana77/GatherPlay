import {Server} from "socket.io";
import http from "http";
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import initVideoSocket from "./websocket/videoSocket.js"

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app)

const io = new Server(server,{ 
    pingTimeout: 60000,
        cors: { 
            origin: "*"
         } 
    });

initVideoSocket(io);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
});

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT} with sockets`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});


