import { port } from "./config.js";
import express from "express";
import router from "./routes.js";

const app = express();
app.get('/', (req, res, next) => {
    next(new Error('Something went wrong :-('));
   });
app.use("/api/codelookup", router);
   //app.use(express.static('public'));

app.listen(port, () => {
 console.log(`listening on port ${port}`);
});
  