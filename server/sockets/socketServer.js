module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-message", (msg) => {
      console.log("Message received on server:", msg);

      io.emit("chat-message", msg);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
