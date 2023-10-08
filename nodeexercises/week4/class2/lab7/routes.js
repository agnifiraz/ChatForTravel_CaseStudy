import { Router } from "express";
import * as rtnLib from "./db_routines.js";
import * as cfg from "./config.js";

let result;
const db =  await rtnLib.getDBInstance();

const router = Router();
// define a default route
router.get("/", (req, res) => {
    let note = "please use country code";
 res.status(200).send( note );
});
router.get("/:name", async (req, res) => {
    let code = req.params.name;
    let countryFullName = await rtnLib.findOne(db, cfg.userobjects, { code });
    if(countryFullName != null){
        result = `The code ${code} belongs to the country of ${countryFullName.name}`;
    }
    else {
        result =  `The code ${code} is not a known country alpha-2 code. `;
    }
    res.status(200).send( result );
  });
export default router; 
