import React, { useReducer } from "react";
import { useQuery } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import logo from "./img/global_logo.png";
import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  AppBar,
  Button,
  Icon,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material";
import theme from "./theme";
import "../App.css";

const AddAdvisoryComponent = (props) => {
  const initialState = {
    contactServer: false,
    countries: [],
    pickNamesFromUser: [],
    name: "",
    country: "",
    len: 0,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const { isLoading, error, data } = useQuery("querykeyname", async () => {
    // let response = await fetch("http://localhost:5000/graphql", {
    let response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        query: "query { alerts{country,name, text, date, region, subregion} }",
      }),
    });
    let json = await response.json();
    state.len = json.data.alerts.length;
    props.setSnackbarMsg(`found ${state.len} countries`);

    setState({
      countries: json.data.alerts,
      contactServer: true,
      pickNamesFromUser: json.data.alerts.map((p) => String(p.name)),
    });
    return json;
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleNameInput = (e) => {
    setState({ name: e.target.value });
  };

  const handleCountryInput = (event, value) => {
    setState({ country: value });
  };

  const emptyorundefined =
    state.name === undefined ||
    state.name === "" ||
    state.country === undefined ||
    state.country === "";

  const onAddClicked = async () => {
    let value = {
      name: state.name,
      country: state.country,
    };
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      let query = JSON.stringify({
        query: `mutation {addadvisory(name: "${value.name}", country: "${value.country}" ) 
    { name, country, text, date }}`,
      });
      console.log(query);

      //let response = await fetch("http://localhost:5000/graphql", {
      let response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: query,
      });

      let json = await response.json();
      props.setSnackbarMsg(`Added advisory on ${json.data.addadvisory.date}`);

      setState({
        contactServer: true,
        name: "",
        country: "",
      });
    } catch (error) {
      props.setSnackbarMsg(`${error.message} - user not added`);
      setState({
        contactServer: true,
      });
    }
  };

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
        <CardHeader
          title="Add Advisory"
          style={{ textAlign: "center", color: "darkblue" }}
        />

        <CardContent>
          <TextField
            id="traveler"
            label="Traveler's Name"
            variant="outlined"
            onChange={handleNameInput}
            value={state.name}
            style={{ margin: 10 }}
          />

          <Autocomplete
            id="countries"
            options={state.pickNamesFromUser}
            getOptionLabel={(option) => String(option)}
            style={{ width: 300 }}
            onChange={handleCountryInput}
            value={state.country}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Countries"
                variant="outlined"
                fullWidth
              />
            )}
          />

          <Button
            style={{ margin: 20 }}
            color="secondary"
            variant="contained"
            onClick={onAddClicked}
            disabled={emptyorundefined}
          >
            Add Advisory
          </Button>
        </CardContent>

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
export default AddAdvisoryComponent;
