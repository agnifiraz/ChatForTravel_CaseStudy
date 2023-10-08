import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import logo from "./img/global_logo.png";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Toolbar,
  AppBar,
  Button,
  Icon,
} from "@mui/material";
import theme from "./theme";
import "../App.css";

const Project1Component = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <img
          src={logo}
          width={150}
          height={150}
          style={{ marginLeft: "25%" }}
        />

        <CardHeader
          style={{ textAlign: "center", color: "darkblue" }}
          title="World Wide Travel Alerts"
        />
        <footer
          style={{ textAlign: "right", color: "darkblue", marginRight: "9%" }}
        >
          {" "}
          &copy; INFO3139 - 2023{" "}
        </footer>
      </Card>
    </ThemeProvider>
  );
};
export default Project1Component;
