import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import { Router } from "express";

const user_router = Router();
let db = await dbRtns.getDBInstance();

// define a default route to retrieve all users
user_router.get("/", async (req, res) => {
    try {
    let users = await dbRtns.findAll(db, cfg.userobjects);
    //console.log(users.length);
    res.status(200).send({ users: users });
    } catch (err) {
    console.log(err.stack);
    res.status(500).send("get all users failed - internal server error");
    } 
});
user_router.post("/", async (req, res) => {
    try {
      let db = await dbRtns.getDBInstance();
      let user = req.body;
      await dbRtns.addOne(db, cfg.userobjects, user);
      res.status(200).send({ message: "document added to users collection" });
    } catch (err) {
      console.log(err.stack);
      res.status(500).send("add user failed - internal server error");
    }
});

user_router.get("/:name", async (req, res) => {
    try {
        let name = { name: req.params.name };
        let users = await dbRtns.findOne(db, cfg.userobjects, name);
        res.status(200).send({ users: users });
      } catch (err) {
        console.log(err.stack);
        res.status(500).send("get user failed - internal server error");
      }
});

user_router.put("/", async (req, res) => {
  let user = req.body;
  let msg;
  try {
    let updateResults = await dbRtns.updateOne(
      db,
      cfg.userobjects,
      { name: user.name },
      { age: user.age, email: user.email }
    );
    updateResults.lastErrorObject.updatedExisting
      ? (msg = `user data ${updateResults.value.name} was updated`)
      : (msg = `user data was not updated`);
    res.status(200).send({ msg: msg });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("read from web fail");
  }
});

user_router.delete("/:name", async (req, res) => {
    try {
        let name = { name: req.params.name };
        let msg;
        let deleteResults = await dbRtns.deleteOne(db, cfg.userobjects, name);
        deleteResults.deletedCount === 1
        ? (msg = `${deleteResults.deletedCount} user was deleted`)
        : (msg = `user not deleted or doesn't exist`);
        res.status(200).send({ users: msg });
      } catch (err) {
        console.log(err.stack);
        res.status(500).send("get user failed - internal server error");
      }
});


export default user_router;
