export default (io) => {
  io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", ({ roomId, offer, to }) => {
    socket.to(to).emit("offer", { from: socket.id, offer });
  });

  socket.on("answer", ({ roomId, answer, to }) => {
    socket.to(to).emit("answer", { from: socket.id, answer });
  });

  socket.on("ice-candidate", ({ candidate, to }) => {
    socket.to(to).emit("ice-candidate", { from: socket.id, candidate });
  });

  socket.on("disconnect", () => {
    io.emit("user-left", socket.id);
  });
});
};
