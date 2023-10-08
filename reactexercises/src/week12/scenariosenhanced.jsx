import React, { useState, useReducer, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import ChatMsg from "./chatmsg";
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
} from "@mui/material";
import theme from "./theme";
import "../App.css"; // An example of a React Functional Component using JSX syntax

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
};

const ScenariosenhancedComponent = () => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleNameInput = (e) => {
    setState({ name: e.target.value, status: "" });
  };

  const handleRoomInput = (e) => {
    setState({ room: e.target.value });
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

  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.name }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };

  const onNewMessage = (msg) => {
    addMessageToList(msg);
    setState({ typingMsg: "" });
  };

  const addMessageToList = (msg) => {
    let messages = state.messages; // declared earlier in reducer or state hook
    //   console.log();
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
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });
      socket.emit("join", { name: state.name, room: state.room }, (err) => {});
      setState({ isJoinClicked: true, socket: socket });

      socket.on("nameexists", (data) => onExists(data, socket));
      socket.on("welcome", addMessageToList);
      socket.on("someonejoined", addMessageToList);
      socket.on("someoneleft", addMessageToList);
      socket.on("someoneistyping", onTyping);
      socket.on("newmessage", onNewMessage);

      // if (socket.io._readyState === "opening")
      //   setState({ showMsg: true, msg: "can't get connection - try later!" });
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
            INFO3139 - Socket IO
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader
          style={{ textAlign: "center", color: "darkblue" }}
          title="Scenario Enhanced Test"
        />
        {state.isJoinClicked ? null : (
          <div>
            <TextField
              style={{
                width: "70%",
                marginLeft: "3%",
                marginBottom: "5%",
                marginRight: "3%",
              }}
              placeholder="Enter unique name"
              onChange={handleNameInput}
              value={state.name}
              autoFocus={true}
              required
              error={state.status !== ""}
              helperText={state.status}
            />

            <TextField
              style={{
                width: "70%",
                marginLeft: "3%",
                marginBottom: "5%",
                marginRight: "3%",
              }}
              placeholder="Enter room to join here "
              onChange={handleRoomInput}
              value={state.room}
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
                }}
              >
                <p> Current Messages:</p>
                <TextField
                  onChange={onMessageChange}
                  placeholder="type something here"
                  autoFocus={true}
                  value={state.message}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                      e.target.blur();
                    }
                  }}
                />
              </div>
              <p style={{ textAlign: "center" }}>Messages in {state.room}</p>
            </div>
          ) : null}
          <div className="scenario-container">
            {state.messages.map((message, index) => (
              <ChatMsg
                style={{ marginLeft: "5vw" }}
                msg={message.text}
                key={index}
                color={message.color}
              >
                {message.text}
              </ChatMsg>
            ))}
          </div>
        </div>
        <div>
          <Typography color="primary">{state.typingMsg}</Typography>
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

export default ScenariosenhancedComponent;
