import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 Button,
} from "@mui/material";
import theme from "./theme";
import "../App.css";// An example of a React Functional Component using JSX syntax

const FunctionalStateHookComponent = () => {
    const [word, setWord] = useState('');
    const [message, setMessage] = useState(word);
  
    const handleChange = (event) => {
      setWord(event.target.value);
    };
  
    const handleClick = () => {
      setMessage( message + word+" ");
      setWord("");
    };
    const handleClickClear = () => {
        setMessage("");
        setWord("");
      };
 return (
<ThemeProvider theme={theme}>
 <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
 <Toolbar>
 <Typography variant="h6" color="inherit">
 INFO3139 - lab 11
 </Typography>
 </Toolbar>
 </AppBar>
 <Card className="card">
 <CardHeader style={{ textAlign: "center" , color:"darkblue"}} title="Sentence Builder" />
 <CardContent  style={{  color:"#eb34b1"}}>The Message is:  </CardContent>
 <CardContent style={{color:"#0b0ea1", fontWeight:"bold"}}>{message}</CardContent>
 <input style={{width:"30%", marginLeft:"3%",marginBottom:"5%" ,marginRight:"3%"}}  type="text"
        id="word"
        name="word"
        placeholder="Add Word"
        onChange={handleChange}
        value={word}/>

<input data-testid="addbutton" type="submit" variant="outlined"  style={{ marginRight:"2%"}} onClick={handleClick} value="Submit"/>
<Button variant="outlined" onClick={handleClickClear}>Clear msg</Button>
 <p/>
 </Card>
 </ThemeProvider>
 );
};
export default FunctionalStateHookComponent;
