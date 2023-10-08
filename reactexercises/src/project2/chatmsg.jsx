import React, { useEffect, useRef } from "react";
import "../App.css";
import { Typography, ListItem } from "@mui/material";
import Triangle from "./triangle";
const ChatMsg = (props) => {
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current.scrollIntoView(true);
  }, []);

  return (
    <div>
      <ListItem
        ref={userRef}
        className={`userBubble ${props.align === "right" ? "right" : ""}`}
        style={{
          textAlign: "left",
          marginBottom: "2vh",
          backgroundColor: props.color,
          width: "70%",
        }}
        sx={{ justifySelf: "left" }}
      >
        {props.msg}
        <Triangle color={props.color} />
      </ListItem>
      <p></p>
    </div>
  );
};
export default ChatMsg;

// import React from "react";
// import "../App.css";
// import { Typography } from "@mui/material";
// const ChatMsg = (props) => {
//   return (
//     <Typography
//       className="scenario-message"
//       style={{ backgroundColor: props.color }}
//     >
//       {props.msg}
//     </Typography>
//   );
// };
// export default ChatMsg;
