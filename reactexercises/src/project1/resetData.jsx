import React, { useReducer } from "react";
import { useQuery } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import logo from "./img/global_logo.png";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
import AlertComponent from "./alertcomponent";

const ResetDataComponent = (props) => {
  const initialState = {
    tableArray: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const { isLoading, error, data } = useQuery("querykeyname", async () => {
    //let response = await fetch("http://localhost:5000/graphql", {
    let response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ query: "query{ project1_setup {results}}" }),
    });
    let json = await response.json();

    props.setSnackbarMsg("alerts collection setup completed");
    return json;
  });

  //if (isLoading) return "Loading...";
  if (isLoading) {
    props.setSnackbarMsg("running setup");
    return "Loading...";
  }

  if (error) return "An error has occurred: " + error.message;

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
          title="Alert Setup - Details"
          style={{ textAlign: "center" }}
        />

        <CardContent>
          {!isLoading && data && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {data.data.project1_setup.results
                    .replace(/([.])\s*(?=[A-Z])/g, "$1|")
                    .split("|")
                    .map((result, index) => (
                      <AlertComponent
                        key={index}
                        result={result}
                        index={index}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
export default ResetDataComponent;
