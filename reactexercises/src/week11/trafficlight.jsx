import { useReducer, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import theme from "./theme";

import "./light.css";

const TrafficLight = (props) => {
  const initialState = { msg: "", roomMsg: "" };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [color, setColor] = useState("red");
  const [mounted, setMounted] = useState(true); // add mounted state

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    return () => {
      setMounted(false); // set mounted to false on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const serverConnect = () => {
    try {
      //connect to server locally
      // const socket = io.connect("localhost:5000", {
      //   forceNew: true,
      //   transports: ["websocket"],
      //   autoConnect: true,
      //   reconnection: false,
      //   timeout: 5000,
      // });

      const socket = io.connect();

      socket.emit(
        "join",
        { name: props.street, street: props.street },
        (err) => {}
      );
      socket.on("turnLampOn", (data) => handleTurnLampOn(data, socket));

      socket.on("welcome", onWelcome);
      socket.on("newclient", newClientJoined);
      setState({ socket: socket });
      //handleTurnLampOn(props.street, socket); // pass socket to handleTurnLampOn
      if (socket.io._readyState === "opening")
        // we'll see this if server is down or it'll get overwritten if its up
        setState({ msg: "connecting..." });
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred" });
    }
  };
  const onWelcome = (welcomeMsgFromServer) => {
    // setState({ msg: welcomeMsgFromServer });
  };
  const newClientJoined = (joinMsgFromServer) => {
    // setState({ roomMsg: joinMsgFromServer });
  };
  // lamp handler code, lamp data from server

  const handleTurnLampOn = async (lampData, socket) => {
    socket.disconnect(); // don't need server anymore once we have data
    setState({ msg: "disconnected" });
    console.log(lampData);
    while (true) {
      // loop until browser closes
      // wait on current colour, then set next color
      await waitSomeSeconds(lampData.red, "green");
      await waitSomeSeconds(lampData.green, "yellow");
      await waitSomeSeconds(lampData.yellow, "red");
      //   break;
      //.. green and yellow lamps go here
    }
  };

  const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setColor(nextColorToIlluminate); // update state variable
        resolve();
      }, waitTime);
    });
  };

  const getStateColor = (c) => (color === c ? color : "white");

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>{state.msg}</div>

        <div className="light" style={{ marginTop: 50 }}>
          <div
            className="lamp"
            style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }}
          />
          <div
            className="lamp"
            style={{
              backgroundColor: getStateColor("yellow"),
              margin: ".5rem",
            }}
          />
          <div
            className="lamp"
            style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }}
          />
          <div style={{ textAlign: "center", fontName: "Helvetica" }}>
            {props.street}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default TrafficLight;
