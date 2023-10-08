import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("public"));
let httpServer = http.createServer(app);
app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// Socket.io server
const io = new Server(httpServer, {});
// main socket routine
//io.on("connection", (socket) => console.log("new connection established"));
const streetLights = [
  { streetName: "Agnita", green: 9200, red: 1000, yellow: 400 },
  { streetName: "Paul", green: 2000, red: 999, yellow: 300 },
  { streetName: "Info3139", green: 4500, red: 800, yellow: 700 },
];

io.on("connection", (socket) => {
  console.log("new connection established");
  // client has joined
  socket.on("join", (client) => {
    socket.name = client.name;
    // use the room property to create a room
    socket.join(client.street);
    console.log(`${socket.name} has joined ${client.street}`);
    socket.emit(
      "welcome",
      `Welcome ${socket.name}, currently there are ${getNumberOfUsersInRoom(
        client.street
      )}`
    );

    // Find the matching street light data based on the room name
    const streetLight = streetLights.find(
      (checking) => checking.streetName === client.street
    );

    // Emit turnLampOn message to the client with street light data
    socket.emit("turnLampOn", streetLight);

    socket
      .to(client.room)
      .emit("newclient", `${socket.name} has joined this room`);
  });
});
const getNumberOfUsersInRoom = (roomName) =>
  io.sockets.adapter.rooms.get(roomName).size;

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
