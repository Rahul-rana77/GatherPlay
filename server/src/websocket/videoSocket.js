export default (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New user connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("video_update", ({ roomId, videoUrl }) => {
      socket.to(roomId).emit("video_update", { videoUrl });
    });

    socket.on("video_control", ({ roomId, action, time }) => {
      socket.to(roomId).emit("video_control", { action, time });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};
