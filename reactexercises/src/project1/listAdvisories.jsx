import React, { useReducer, useState } from "react";
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
  Button,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  Checkbox,
} from "@mui/material";
import theme from "./theme";
import "../App.css";

const ListAdvisoriesComponent = (props) => {
  const initialState = {
    contactServer: false,
    countries: [],
    pickTravelerName: [],
    pickRegionName: [],
    pickSubregionName: [],
    tableArray: [],
    tableArray1: [],
    tableArray2: [],
    len: 0,
    name: "",
    country: "",
    showTable: false,
    travelerChecked: false,
    regionChecked: false,
    subregionChecked: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const { isLoading, error, data } = useQuery("querykeyname", async () => {
    let dataC;
    return dataC;
  });

  const fetchData = async (query, value) => {
    //let response = await fetch("http://localhost:5000/graphql", {
    let response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        query: query,
        variables: value,
      }),
    });
    const json = await response.json();
    return json;
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleTravelerInput = async (event, value) => {
    setState({ showTable: true });
    try {
      let res = await fetchData(
        "query ($name: String) {advisoryfortraveler(name: $name) {name, country, text, date}}",
        { name: value }
      );
      state.len = res.data.advisoryfortraveler.length;
      props.setSnackbarMsg(`found ${state.len} alerts for ${value}`);
      setState({ tableArray1: res.data.advisoryfortraveler });
    } catch {}
  };

  const handleRegionInput = async (event, value) => {
    setState({ showTable: true });

    try {
      let res = await fetchData(
        "query ($region: String) {advisoryforregion(region: $region) {name, country, text, date}}",
        { region: value }
      );
      state.len = res.data.advisoryforregion.length;
      props.setSnackbarMsg(`found ${state.len} alerts for ${value}`);
      setState({ tableArray: res.data.advisoryforregion });
    } catch {}
  };

  const handleSubregionInput = async (event, value) => {
    setState({ showTable: true });

    try {
      let res = await fetchData(
        "query ($subregion: String) {advisoryforsubregion(subregion: $subregion) {name, country, text, date}}",
        { subregion: value }
      );
      state.len = res.data.advisoryforsubregion.length;
      props.setSnackbarMsg(`found ${state.len} alerts for ${value}`);
      setState({ tableArray2: res.data.advisoryforsubregion });
    } catch {}
  };

  const handleCheckboxChange = async (event) => {
    setState({ travelerChecked: event.target.checked });

    try {
      let res = await fetchData("query{travelers}");
      state.len = res.data.travelers.length;
      props.setSnackbarMsg(`found ${state.len} traveler`);
      setState({
        pickTravelerName: res.data.travelers,
      });
    } catch {}
  };

  const handleRegionCheckboxChange = async (event) => {
    setState({ regionChecked: event.target.checked });

    try {
      let res = await fetchData("query{regions}");
      state.len = res.data.regions.length - 1;
      props.setSnackbarMsg(`found ${state.len} regions`);
      setState({ pickRegionName: res.data.regions });
    } catch {}
  };

  const handleSubregionCheckboxChange = async (event) => {
    setState({ subregionChecked: event.target.checked });

    try {
      let res = await fetchData("query{subregions}");
      state.len = res.data.subregions.length;
      props.setSnackbarMsg(`found ${state.len} subregions`);
      setState({ pickSubregionName: res.data.subregions });
    } catch {}
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
          <p>
            Traveler
            <Checkbox
              type="checkbox"
              checked={state.travelerChecked}
              onChange={handleCheckboxChange}
            />
            Region
            <Checkbox
              type="checkbox"
              checked={state.regionChecked}
              onChange={handleRegionCheckboxChange}
            />
            SubRegion
            <Checkbox
              type="checkbox"
              checked={state.subregionChecked}
              onChange={handleSubregionCheckboxChange}
            />
          </p>

          {state.travelerChecked && (
            <div>
              <Autocomplete
                id="countries"
                options={state.pickTravelerName}
                getOptionLabel={(option) => String(option)}
                style={{ width: 300 }}
                onChange={handleTravelerInput}
                value={state.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Travelers"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              {state.showTable && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Country
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Alert Information
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.tableArray1.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.country}</TableCell>
                          <TableCell>
                            {result.text} {result.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}

          {state.regionChecked && (
            <div>
              <Autocomplete
                id="regions"
                options={state.pickRegionName}
                getOptionLabel={(option) => String(option)}
                style={{ width: 300 }}
                onChange={handleRegionInput}
                value={state.region}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Regions"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              {state.showTable && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Country
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Alert Information
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.tableArray.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.country}</TableCell>
                          <TableCell>
                            {result.text} {result.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}

          {state.subregionChecked && (
            <div>
              <Autocomplete
                id="subregions"
                options={state.pickSubregionName}
                getOptionLabel={(option) => String(option)}
                style={{ width: 300 }}
                onChange={handleSubregionInput}
                value={state.subregion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subregions"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              {state.showTable && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Country
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            fontSize: 16,
                            color: "darkblue",
                          }}
                        >
                          Alert Information
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.tableArray2.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.country}</TableCell>
                          <TableCell>
                            {result.text} {result.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
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
export default ListAdvisoriesComponent;
