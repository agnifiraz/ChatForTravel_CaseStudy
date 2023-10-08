import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
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
} from "@mui/material";
import theme from "./theme";
import "../../App.css";

const MaterialUIEx2Component = () => {
  const [selection, setSelection] = useState("");
  const [message, setMessage] = useState(selection);
  const onChange = (e, selectedOption) => {
    //  selectedOption
    //  ? setSelection(`You selected ${selectedOption}`)
    //  : setSelection("");
    selectedOption
      ? setMessage(message + `${selectedOption} `)
      : setMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - lab 12
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="card">
        <CardHeader
          title="Sentence Builder using Autocomplete"
          style={{ textAlign: "center" }}
        />
        <CardContent>
          <Autocomplete
            id="fruits"
            options={fruits}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="pick a word"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p />
          <Typography variant="h6" color="error">
            {message}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
const fruits = ["Hey", "I", "built", "a", "sentence.", "Agnita Paul"];
export default MaterialUIEx2Component;
