require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

// Import MongoDB connection and routes
require("./config/database").connect();
const userRoutes = require("./routes/user");
const msgController=require("./Controllers/messageController")

const app = express();
const server = http.createServer(app);

// Socket.IO setup for real-time communication
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});
// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/v1', userRoutes);

//  Socket.IO Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join user to a room based on email
  socket.on("set_email", (email) => {
    socket.join(email.toLowerCase());
    console.log(`Socket ${socket.id} joined room: ${email}`);
  });

// Handle sending a message
  socket.on("send_message", async (msgData) => {
    try {
      const toRoom = msgData.to.toLowerCase();
      const fromRoom = msgData.from.toLowerCase();

      const recipientOnline = io.sockets.adapter.rooms.has(toRoom);

      const savedMessage = await msgController.saveMessage(msgData, recipientOnline, io);

      io.to(toRoom).emit("receive_message", savedMessage);
      io.to(fromRoom).emit("message_saved", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Mark messages as read
  socket.on("mark_messages_read", async ({ user1, user2 }) => {
    try {
      await msgController.markMessagesRead(user1, user2);

      io.to(user1.toLowerCase()).emit("messages_read_update", { user1, user2 });
      io.to(user2.toLowerCase()).emit("messages_read_update", { user1, user2 });
    } catch (error) {
      console.error("Error marking messages read:", error);
    }
  });
});

// ✅ Server Listen
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
