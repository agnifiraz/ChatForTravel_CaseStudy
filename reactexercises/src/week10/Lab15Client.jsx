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

const Lab15ClientComponent = () => {
  const initialState = {
    showMsg: false,
    name: "",
    room: "",
    msg: "",
    roomMsg: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWelcome = (welcomeMsgFromServer) => {
    setState({ msg: welcomeMsgFromServer });
  };
  const newClientJoined = (joinMsgFromServer) => {
    setState({ roomMsg: joinMsgFromServer });
  };

  const handleNameInput = (e) => {
    setState({ name: e.target.value });
  };
  const handleRoomInput = (e) => {
    setState({ room: e.target.value });
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
      socket.on("welcome", onWelcome);
      socket.on("newclient", newClientJoined);
      setState({
        socket: socket,
        showMsg: true,
      });
      if (socket.io._readyState === "opening")
        // we'll see this if server is down or it'll get overwritten if its up
        setState({ msg: "can't get connection - try later!", showMsg: true });
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred", showMsg: true });
    }
  };

  const snackbarClose = () => {
    setState({ showMsg: false });
  };

  const emptyorundefined =
    state.name === undefined ||
    state.name === "" ||
    state.room === undefined ||
    state.room === "";

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          style={{ textAlign: "center", color: "darkblue" }}
          title="Lab 15 - Socket.io"
        />
        <CardContent>
          <TextField
            style={{
              width: "70%",
              marginLeft: "3%",
              marginBottom: "5%",
              marginRight: "3%",
            }}
            placeholder="Enter user's name here "
            onChange={handleNameInput}
            value={state.name}
          />
          <p />
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
          <p />

          <Button
            variant="contained"
            style={{
              marginRight: "3%",
              marginTop: "5%",
              marginBottom: "3%",
              float: "left",
            }}
            onClick={onAddClicked}
            disabled={emptyorundefined}
          >
            Join
          </Button>
          <Snackbar
            open={state.showMsg}
            message={state.msg}
            autoHideDuration={4000}
            onClose={snackbarClose}
          />
        </CardContent>
      </Card>
      <div style={{ marginTop: 10, float: "center" }}>
        {state.roomMsg ? (
          <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
        ) : null}
      </div>
    </ThemeProvider>
  );
};

export default Lab15ClientComponent;
