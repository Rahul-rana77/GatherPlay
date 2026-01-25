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
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("play", ({ roomId, time }) => {
    socket.to(roomId).emit("play", time);
  });

  socket.on("pause", ({ roomId, time }) => {
    socket.to(roomId).emit("pause", time);
  });

  socket.on("seek", ({ roomId, time }) => {
    socket.to(roomId).emit("seek", time);
  });

  socket.on("video-change", ({ roomId, videoId }) => {
    socket.to(roomId).emit("video-change", videoId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT} with sockets`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});


