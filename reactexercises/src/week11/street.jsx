import "./light.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import TrafficLight from "./trafficlight";
import { textAlign } from "@mui/system";

const StreetComponent = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: "center" }}>Lab 17</h1>
      <div className="flex-container">
        <TrafficLight street="Agnita" />
        <TrafficLight street="Paul" />
        <TrafficLight street="Info3139" />
      </div>
    </ThemeProvider>
  );
};
export default StreetComponent;
