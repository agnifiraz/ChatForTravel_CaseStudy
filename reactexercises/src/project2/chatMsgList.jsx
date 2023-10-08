import { List } from "@mui/material";
import ChatMsg from "./chatmsg";

const ChatMsgList = ({ messages, userName }) => {
  // const name = (messages ?? "").split(" ")[0];
  // const align = name === userName ? "right" : "left";
  const msg = messages.map((message, index) => (
    <ChatMsg
      style={{ marginLeft: "5vw" }}
      msg={message.text}
      key={index}
      color={message.color}
      align={message.text.split(" ")[0] === userName ? "right" : "left"}
    />
  ));

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "flex-start",
        height: "100%",
        width: "100vw",
      }}
    >
      {msg}
    </List>
  );
};

export default ChatMsgList;
