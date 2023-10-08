import moment from "moment";
import matColours from "./matdes100colours.json" assert { type: "json" };

let userNames = [];
let coloridx1 = Math.floor(Math.random() * matColours.colours.length) + 1;
let adminColor = matColours.colours[coloridx1];

const socketHandlers = {
  handleJoin: (socket, io) => {
    // client has joined
    socket.on("join", (client) => {
      // use the room property to create a room

      // check if user name already exists in the room
      if (userNames.includes(client.name)) {
        socket.emit(
          "nameexists",
          `${client.name} is already taken, try a different name`
        );
        return;
      }

      let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
      socket.color = matColours.colours[coloridx];

      socket.name = client.name;
      socket.room = client.room;
      // add user name to the array
      userNames.push(client.name);

      socket.join(client.room);
      console.log(`${socket.name} has joined ${client.room}`);

      //${socket.name} says @${moment().format("h:mm:ss a")}

      // send message to joining client
      // socket.emit(
      //   "welcome",
      //   `Admin says @${moment().format("h:mm:ss a")} :  Welcome ${socket.name}`
      // );
      socket.emit("welcome", {
        text: `Admin says @${moment().format("h:mm:ss a")}: Welcome ${
          socket.name
        }`,
        color: adminColor,
      });

      // // someonejoined
      // socket
      //   .to(client.room)
      //   .emit(
      //     "someonejoined",
      //     `Admin says @${moment().format("h:mm:ss a")} :  ${
      //       socket.name
      //     } has joined the ${client.room} room!`
      //   );

      // someonejoined
      socket.to(client.room).emit("someonejoined", {
        text: `Admin says @${moment().format("h:mm:ss a")}: ${
          socket.name
        } has joined the ${client.room} room!`,
        color: adminColor,
      });

      // send message to rest of the room the client just joined
      socket
        .to(client.room)
        .emit(
          "newclient",
          `${socket.name} has joined the ${client.room}  room`
        );
    });
  },
  getNumberOfUsersInRoom: (io, roomName) =>
    io.sockets.adapter.rooms.get(roomName).size,
  handleDisconnect: async (socket) => {
    socket.broadcast.to(socket.room).emit("someoneleft", {
      text: `Admin says @${moment().format("h:mm:ss a")} :  ${
        socket.name
      } has left room ${socket.room}`,
      color: adminColor,
    });
    userNames.forEach((userName, index) => {
      if (socket.name === userName.name && socket.room === userName.room) {
        userNames.splice(index, 1);
        // break;
      }
    });
  },

  handleTyping: (socket, client) => {
    socket.to(socket.room).emit("someoneistyping", `${socket.name} is typing`);
  },

  handleMessage: (io, socket, client) => {
    io.in(socket.room).emit("newmessage", {
      text: `${socket.name} says @${moment().format("h:mm:ss a")} :  ${
        client.text
      }`,
      color: socket.color,
    });
  },
};

export default socketHandlers;
