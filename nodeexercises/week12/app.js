import { port } from "./config.js";
import express from "express";
import { Server } from "socket.io";
import http from "http";
import socketHandlers from "./socketHandlers.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));

let httpServer = http.createServer(app);

app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));

// Socket.io server
const io = new Server(httpServer, {});

// main socket routine
io.on("connection", (socket) => {
  console.log("new connection established");
  socketHandlers.handleJoin(socket, io);
  // scenario 2 - client disconnects from server
  socket.on("disconnect", () => {
    socketHandlers.handleDisconnect(socket);
  });
  // scenario 3 - client sends notification that user started typing
  socket.on("typing", (client) => {
    socketHandlers.handleTyping(socket, client);
  });
  // scenario 4 - client sends message to room including self
  socket.on("message", (client) => {
    socketHandlers.handleMessage(io, socket, client);
  });
});

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
