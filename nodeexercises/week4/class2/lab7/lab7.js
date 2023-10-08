import * as rtnLib from "./db_routines.js";
import * as cfg from "./config.js";

let result; 
const dotEnvWrite = async (code) => {
  try {
      const db =  await rtnLib.getDBInstance();
      let countryFullName = await rtnLib.findOne(db, cfg.userobjects, { code });
      if(countryFullName != null){
          result=  `The code ${code} belongs to the country of ${countryFullName.name}`;
      }
      else {
          result = `The code ${code} is not a known country alpha-2 code. `;
      }
      //process.exit(0);
    } catch (err) {
    console.log(err);
   // process.exit(1);
    }
   };

dotEnvWrite("CA");
