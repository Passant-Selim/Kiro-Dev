require("dotenv").config({ path: "./config.env" });
require("./database/db");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const socketHandler = require("./sockets/socketServer");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server",
    error: err?.message || [],
  });
});

socketHandler(io);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
