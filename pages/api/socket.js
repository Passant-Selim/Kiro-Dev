import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to the server");
});

export default socket;
