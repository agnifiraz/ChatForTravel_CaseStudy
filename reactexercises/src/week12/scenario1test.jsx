import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { textAlign } from "@mui/system";

const Scenario1Test = () => {
  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: "center" }}>Lab 18</h1>
    </ThemeProvider>
  );
};
export default Scenario1Test;
