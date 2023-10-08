import moment from "moment";
//import matColours from "./matdes100colours.json";
import { promises as fsp } from "fs";

let userNames = [];
let roomNames = [];
let colorNames = [];
let roomCheck = [];

const loadColours = async () => {
  let rawData = await fsp.readFile("./matdes100colours.json");
  return JSON.parse(rawData);
};

const matColours = await loadColours();
let coloridx1 = Math.floor(Math.random() * matColours.colours.length) + 1;
let adminColor = matColours.colours[coloridx1];

const socketHandlers = {
  handleJoin: (socket, client) => {
    // check if user name already exists in the room
    if (userNames.includes(client.name)) {
      socket.emit("nameexists", `${client.name} name already exists`);
      return;
    }

    let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
    socket.color = matColours.colours[coloridx];

    socket.name = client.name;
    socket.room = client.room;
    // add user name to the array
    userNames.push(client.name);
    roomNames.push(client.room);
    colorNames.push(socket.color);

    socket.join(client.room);
    console.log(`${socket.name} has joined ${client.room}`);

    socket.emit("welcome", {
      text: `Admin says @${moment().format("h:mm:ss a")} (room - ${
        socket.room
      }): Welcome ${socket.name}`,
      color: adminColor,
    });

    // someonejoined
    socket.to(client.room).emit("someonejoined", {
      text: `Admin says @${moment().format("h:mm:ss a")} (room - ${
        socket.room
      }) : ${socket.name} has joined the ${client.room} room!`,
      color: adminColor,
    });

    // send message to rest of the room the client just joined
    socket
      .to(client.room)
      .emit("newclient", `${socket.name} has joined the ${client.room}  room`);
    // }
  },
  getNumberOfUsersInRoom: (io, roomName) =>
    io.sockets.adapter.rooms.get(roomName).size,
  handleDisconnect: async (socket) => {
    socket.broadcast.to(socket.room).emit("someoneleft", {
      text: `Admin says @${moment().format("h:mm:ss a")} (from room - ${
        socket.room
      }):  ${socket.name} has left room ${socket.room}`,
      color: adminColor,
    });
    userNames.forEach((userName, index) => {
      if (socket.name === userName.name && socket.room === userName.room) {
        userNames.splice(index, 1);
        roomNames.splice(index, 1);
        colorNames.splice(index, 1);
      }
    });
  },

  handleTyping: (socket, client) => {
    socket
      .to(socket.room)
      .emit("someoneistyping", `...${socket.name} is typing`);
  },

  handleMessage: (io, socket, client) => {
    io.in(socket.room).emit("newmessage", {
      text: `${socket.name} says @${moment().format("h:mm:ss a")} (room - ${
        socket.room
      }) :  ${client.text}`,
      color: socket.color,
    });
  },

  handleTopBar: (io, socket, client) => {
    let userArray = [];
    let roomArray = [];
    let userArrayMessage = "";

    roomNames.forEach((roomName) => {
      const usersInRoom = userNames.filter(
        (userName) => userName.room === roomName
      );
      usersInRoom.forEach((user) => {
        userArray.push(user);
      });

      userArrayMessage += ` Users in ${roomName}: ${usersInRoom
        .map((user) => user.name)
        .join(", ")}.`;
    });

    userArray.forEach((user) => {
      if (user.socketId !== socket.id) {
        roomArray = roomArray.concat(user.rooms);
      }
    });

    socket.broadcast.to(socket.room).emit("topbarButton", {
      text: userArrayMessage,
      color: adminColor,
    });
  },

  handleGetRoomsAndUsers: (io) => {
    const userAndRooms = [];
    for (let i = 0; i < userNames.length; i++) {
      const userData = {
        name: userNames[i],
        room: roomNames[i],
        color: colorNames[i],
      };
      userAndRooms.push(userData);
    }
    io.emit("topbarUser", userAndRooms);
  },

  handleGetRooms: (socket, client) => {
    //  console.log(client);
    if (!roomCheck.includes(client.text)) {
      socket.broadcast.emit("newRoomAdded", client.text);
      socket.broadcast.emit("uniqueRoom", roomCheck);
      if (client.text !== "main") {
        roomCheck.push(client.text);
        console.log(`checking room ${client.text}`);
      }
      return;
    }
  },

  handleAllRooms: (socket) => {
    socket.broadcast.emit("uniqueRoom", roomCheck);
    return;
  },
};

export default socketHandlers;
