import React, { useState, useReducer, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import ChatMsg from "./chatmsg";
import logo from "./img/chat.png";
import TopBar from "./topbar";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Snackbar,
  Typography,
  TextField,
  Button,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import theme from "./theme";
import "../App.css"; // An example of a React Functional Component using JSX syntax
import ChatMsgList from "./chatMsgList";

const initialState = {
  showMsg: false,
  name: "",
  room: "",
  msg: "",
  roomMsg: "",
  messages: [],
  message: "",
  status: "",
  isJoinClicked: false,
  error: "",
  isTyping: false,
  typingMsg: "",
  from: "",
  text: "",
  color: "",
  checkRadio: false,
  roomArray: [],
  topbarMessage: "",
};

const Project2Component = () => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [classSelect, setClassSelect] = useState();
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const effectRan = useRef(false);
  useEffect(() => {
    // if (effectRan.current) return;
    serverConnect();
    // effectRan.current = true;
  }, []);

  const handleNameInput = (e) => {
    setState({ name: e.target.value, status: "" });
  };

  const handleRoomInput = (e) => {
    setState({ ...state, room: e.target.value, status: "" });
  };

  const handleRadioChange = (e) => {
    setState({ ...state, room: e.target.value });
  };

  const onExists = async (data, socket) => {
    socket.disconnect();
    console.log(data);
    setState({ status: data, isJoinClicked: false });
  };

  const onTyping = (msg) => {
    if (msg.from !== state.name) {
      setState({
        typingMsg: msg,
      });
    }
  };

  const uniqueRoomsCheck = (msg) => {
    setState({
      userRooms: msg,
    });
  };

  const addNewRooms = (msg) => {
    let checkingRoom = [];
    checkingRoom.push(msg);
    setState({
      userRooms: checkingRoom,
    });
  };

  const serverConnect = async () => {
    if (state.name == "") {
      setState({ status: "enter a chat name" });
    }
    if (state.room == "") {
      setState({ status: "enter a room name" });
    }
    try {
      //  connect to server locally
      // const socket = io.connect("localhost:5000", {
      //   forceNew: true,
      //   transports: ["websocket"],
      //   autoConnect: true,
      //   reconnection: false,
      //   timeout: 5000,
      // });
      const socket = io.connect();

      setState({ socket: socket });

      socket.on("newRoomAdded", addNewRooms);
      socket.emit("getAllRooms", (err) => {});
      socket.on("uniqueRoom", uniqueRoomsCheck);
    } catch (err) {
      console.log(err);
      setState({ showMsg: true, msg: "some other problem occurred" });
    }
  };

  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.name }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };

  const onTopBarMessageChange = (e) => {
    state.socket.emit("topbarinfo", { from: state.name }, (err) => {});
  };

  const onNewMessage = (msg) => {
    addMessageToList(msg);
    setState({ typingMsg: "" });
  };

  const topBarButtonOutput = (data) => {
    console.log(data);
    setState({ userAndRooms: data, roomArray: data });
  };

  const addMessageToList = (msg) => {
    let messages = state.messages; // declared earlier in reducer or state hook
    messages.push(msg);
    setState({
      messages: messages,
    });
  };

  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: state.name, text: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
    }
  };

  const onAddClicked = async () => {
    try {
      // connect to server locally
      // const socket = io.connect("localhost:5000", {
      //   forceNew: true,
      //   transports: ["websocket"],
      //   autoConnect: true,
      //   reconnection: false,
      //   timeout: 5000,
      // });
      const socket = io.connect();

      socket.emit("join", { name: state.name, room: state.room }, (err) => {});
      setState({ isJoinClicked: true, socket: socket });

      socket.emit("getUniqueRooms", { text: state.room }, (err) => {});
      //socket.on("roomAvailable", (data) => roomCheckArray(data, socket));
      socket.on("nameexists", (data) => onExists(data, socket));
      socket.on("welcome", addMessageToList);
      socket.on("someonejoined", addMessageToList);
      socket.on("someoneleft", addMessageToList);
      socket.on("someoneistyping", onTyping);
      socket.on("newmessage", onNewMessage);
      socket.on("topbarUser", topBarButtonOutput);

      socket.emit("getAllRooms", (err) => {});
      socket.on("uniqueRoom", uniqueRoomsCheck);
    } catch (err) {
      console.log(err);
      setState({ showMsg: true, msg: "some other problem occurred" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Chat it Up! - INFO3139
          </Typography>
        </Toolbar>
      </AppBar>
      {state.isJoinClicked ? (
        <div>
          <TopBar viewDialog={handleOpenDialog} />
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            style={{ margin: 20, borderRadius: "2rem" }}
            sx={{
              borderRadius: "2rem",
            }}
          >
            <div style={{ borderRadius: "2rem" }}>
              <DialogTitle style={{ textAlign: "center" }}>
                Who's On?
              </DialogTitle>
              <DialogContent onChange={onTopBarMessageChange}>
                <List>
                  {state.userAndRooms &&
                    state.userAndRooms.map((data, index) => {
                      const name = data.name;
                      const room = data.room;
                      const color = data.color;
                      return (
                        <>
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              color: color,
                            }}
                          >
                            <ListItemAvatar>
                              <InsertEmoticonIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${name} has joined ${room}`}
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      );
                    })}
                </List>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      ) : null}

      <Card className="card" style={{ height: 660, overflow: "auto" }}>
        {state.isJoinClicked ? null : (
          <div>
            <img
              src={logo}
              width={150}
              height={150}
              style={{ marginLeft: "25%" }}
            />
            <CardHeader
              style={{
                textAlign: "center",
                color: "darkblue",
                fontWeight: "bolder",
              }}
              title="Sign In"
            />
          </div>
        )}
        {state.isJoinClicked ? null : (
          <div>
            <TextField
              style={{
                width: "70%",
                marginLeft: "3%",
                marginBottom: "5%",
                marginRight: "3%",
              }}
              placeholder="Chat Name"
              onChange={handleNameInput}
              value={state.name}
              autoFocus={true}
              required
              error={state.status !== ""}
              helperText={state.status}
            />
            <h4 style={{ textAlign: "center", color: "blue" }}>
              Join Existing or Enter Room Name
            </h4>

            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="room"
                  name="room"
                  value={state.room}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="main"
                    control={<Radio />}
                    label="main"
                  />
                  {state.userRooms &&
                    state.userRooms.map((data, index) => (
                      <FormControlLabel
                        value={data}
                        control={<Radio />}
                        label={data}
                        key={index}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </div>

            <TextField
              style={{
                width: "70%",
                marginLeft: "3%",
                marginBottom: "5%",
                marginRight: "3%",
              }}
              placeholder="Room Name"
              onChange={handleRoomInput}
              value={state.room}
              required
              error={state.status !== ""}
              helperText={state.status}
            />
            <div>
              <Button
                variant="contained"
                data-testid="addbutton"
                style={{
                  marginRight: "3%",
                  marginTop: "5%",
                  marginBottom: "3%",
                  float: "left",
                }}
                onClick={onAddClicked}
                disabled={state.name === "" || state.room === ""}
              >
                Join
              </Button>
            </div>
          </div>
        )}

        <div>
          {state.isJoinClicked ? (
            <div>
              <div
                style={{
                  paddingTop: "2vh",
                  paddingLeft: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: 40,
                  left: 10,
                }}
              >
                <TextField
                  onChange={onMessageChange}
                  placeholder="type something here"
                  style={{ width: 350 }}
                  autoFocus={true}
                  value={state.message}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                      e.target.blur();
                    }
                  }}
                />
                <div>
                  <Typography color="error">{state.typingMsg}</Typography>
                </div>
              </div>
            </div>
          ) : null}
          <div className="scenario-container">
            <ChatMsgList messages={state.messages} userName={state.name} />
          </div>
        </div>
      </Card>
      <div>
        {state.roomMsg ? (
          <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default Project2Component;
