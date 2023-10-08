import React, { useReducer, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import theme from "./theme";
import "../../App.css";
import AddCircle from "@mui/icons-material/AddCircle";
const Lab13Component = () => {
  const initialState = {
    contactServer: false,
    msg: "",
    snackBarMsg: "",
    users: [],
    pickNamesFromUser: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [selection, setSelection] = useState("");

  const onChange = (e, selectedOption) => {
    if (selectedOption) {
      const user = state.users.find((u) => u.name === selectedOption);
      setSelection(
        `You selected ${selectedOption}. This user can be contacted at ${user.email}`
      );
    } else {
      setSelection("");
    }
    state.msg = "";
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setState({
        contactServer: true,
        snackBarMsg: "Attempting to load users from server...",
      });
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ query: "query { users{name,age,email} }" }),
      });
      let json = await response.json();
      setState({
        snackBarMsg: `users data loaded`,
        users: json.data.users,
        contactServer: true,
        pickNamesFromUser: json.data.users.map((p) => p.name),
      });
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: `${state.users.length} users loaded`,
      snackBarMsg: `users data loaded`,
      contactServer: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Lab 13 - Search for User"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          <Autocomplete
            id="users"
            options={state.pickNamesFromUser}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Available Users"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <p />
          <Typography variant="h6" color="primary">
            {selection}
          </Typography>
          <div>
            <Typography color="primary">{state.msg}</Typography>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={4000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default Lab13Component;
