import React from "react";
import "../App.css";
import { Typography } from "@mui/material";
const ChatMsg = (props) => {
  return (
    <Typography
      className="scenario-message"
      style={{ backgroundColor: props.color }}
    >
      {props.msg}
    </Typography>
  );
};
export default ChatMsg;
