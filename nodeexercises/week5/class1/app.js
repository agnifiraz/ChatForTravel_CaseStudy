import { port } from "./config.js";
import express from "express";
import user_router from "./user_routes.js";

const app = express();
// app.get('/', (req, res, next) => {
//     next(new Error('Something went wrong :-('));
//    });
// app.use("/thisapp", router);
// app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use("/api/users", user_router);  
app.listen(port, () => { 
 console.log(`listening on port ${port}`);
});

