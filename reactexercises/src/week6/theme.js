import { createTheme } from "@mui/material/styles";
export default createTheme({
 typography: {
 useNextVariants: true,
 },
 palette:{common:{black:"#000",white:"#fff"},
 background:{paper:"#fff",default:"#fafafa"},
 primary:{light:"rgba(200, 206, 231, 1)",main:"rgba(6, 24, 179, 1)",dark:"rgba(3, 12, 75, 1)",contrastText:"#fff"},
 secondary:{light:"rgba(201, 169, 219, 1)",main:"rgba(127, 5, 177, 1)",dark:"rgba(61, 3, 85, 1)",contrastText:"#fff"},
 error:{light:"#e57373",main:"#f44336",dark:"#d32f2f",contrastText:"#fff"},
 text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",
 disabled:"rgba(0, 0, 0, 0.38)",
 hint:"rgba(0, 0, 0, 0.38)"}} 
});
