import Project2Component from "./project2/ProjectTwo";
function App() {
  return (
    <div>
      <Project2Component />
    </div>
  );
}
export default App;

// import React, { useState } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { Routes, Route, NavLink } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./week7/class1/theme";
// import {
//   Toolbar,
//   AppBar,
//   Menu,
//   MenuItem,
//   IconButton,
//   Typography,
//   Snackbar,
// } from "@mui/material";
// import ResetDataComponent from "./project1/resetData";
// import Project1Component from "./project1/project1component";
// import AddAdvisoryComponent from "./project1/addAdvisory";
// import ListAdvisoriesComponent from "./project1/listAdvisories";
// const queryClient = new QueryClient();

// const App = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [snackbarMsg, setSnackbarMsg] = useState("");

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarMsg("");
//   };
//   const handleSnackbarMsg = (msg) => {
//     setSnackbarMsg(msg);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar>
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             INFO3139 - Case #1
//           </Typography>
//           <IconButton
//             id="menubtn"
//             onClick={handleClick}
//             color="inherit"
//             style={{ marginLeft: "auto", paddingRight: "1vh" }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="simple-menu"
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem component={NavLink} to="/home" onClick={handleClose}>
//               Home
//             </MenuItem>
//             <MenuItem component={NavLink} to="/resetdata" onClick={handleClose}>
//               Reset Data
//             </MenuItem>
//             <MenuItem
//               component={NavLink}
//               to="/addaddvisory"
//               onClick={handleClose}
//             >
//               Add Advisory
//             </MenuItem>
//             <MenuItem
//               component={NavLink}
//               to="/listadvisories"
//               onClick={handleClose}
//             >
//               List Advisories
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Snackbar
//         open={snackbarMsg !== ""}
//         message={snackbarMsg}
//         autoHideDuration={4000}
//         onClose={handleSnackbarClose}
//       />
//       <Routes>
//         <Route path="/" element={<Project1Component />} />
//         <Route path="/home" element={<Project1Component />} />
//         <Route
//           path="/resetdata"
//           element={
//             <QueryClientProvider client={queryClient}>
//               {" "}
//               <ResetDataComponent setSnackbarMsg={handleSnackbarMsg} />{" "}
//             </QueryClientProvider>
//           }
//         />
//         <Route
//           path="/addaddvisory"
//           element={
//             <QueryClientProvider client={queryClient}>
//               {" "}
//               <AddAdvisoryComponent setSnackbarMsg={handleSnackbarMsg} />{" "}
//             </QueryClientProvider>
//           }
//         />
//         <Route
//           path="/listadvisories"
//           element={
//             <QueryClientProvider client={queryClient}>
//               {" "}
//               <ListAdvisoriesComponent
//                 setSnackbarMsg={handleSnackbarMsg}
//               />{" "}
//             </QueryClientProvider>
//           }
//         />
//       </Routes>
//     </ThemeProvider>
//   );
// };
// export default App;
