import React, { useState, useReducer, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
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
  status: "",
  isJoinClicked: false,
  clientNames: [],
  valid: true,
  error: "",
};

let arrayCheck = [];

const Lab18ClientComponent = () => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleNameInput = (e) => {
    setState({ name: e.target.value });
  };

  const handleRoomInput = (e) => {
    setState({ room: e.target.value });
  };

  const onExists = async (data, socket) => {
    socket.disconnect();
    console.log(data);
    setState({ status: data, isJoinClicked: false });
  };

  const addMessageToList = (msg) => {
    let messages = state.messages; // declared earlier in reducer or state hook
    //   console.log();
    messages.push(msg);
    setState({
      messages: messages,
    });
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
          title="Scenarios 1"
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
            <div
              style={{
                paddingTop: "2vh",
                paddingLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Current Messages:
            </div>
          ) : null}
          {state.messages.map((message, index) => (
            <Typography style={{ marginLeft: "5vw" }} key={index}>
              {message}
            </Typography>
          ))}
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

export default Lab18ClientComponent;
