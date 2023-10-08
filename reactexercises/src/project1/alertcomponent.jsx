import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TableRow, TableCell } from "@mui/material";
import theme from "./theme";
import "../App.css";

const AlertComponent = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <TableRow key={props.index}>
        <TableCell
          style={{
            fontSize: "90%",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {props.result}
        </TableCell>
      </TableRow>
    </ThemeProvider>
  );
};
export default AlertComponent;
