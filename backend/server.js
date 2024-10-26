const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your frontend to connect
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials if needed
  },
});

// Use CORS middleware
app.use(cors());

// Your existing socket.io setup
io.on("connection", (socket) => {
  console.log("New user connected");

  // Handle signaling messages here
  socket.on("signal", (data) => {
    socket.broadcast.emit("signal", data); // Broadcast the signal to other clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
