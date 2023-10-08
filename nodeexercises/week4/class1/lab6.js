import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as rtnLib from "./db_routines.js";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv))
 .options({
countryCode: {
    alias: "code",   
    describe: "Country Code",
    string: true,
    require: true,
 }, 
 })
 .help()
 .alias("help", "h")
 .parse();
 const dotEnvWrite = async () => {
    try {
        let rawData = await rtnLib.getJSONFromWWWPromise(cfg.rawdata);
        const db = await rtnLib.getDBInstance();

        let count = await rtnLib.count(db, cfg.userobjects);
        console.log(
        `there are currently ${count} documents in the countries collection`
        );  

        let dlt =await rtnLib.deleteAll(db, cfg.userobjects);
        console.log(
        `deleted ${dlt.deletedCount} documents from the countries collection`
        );

        const countryCodeName = rawData.map((d) => ({ name: d.name, code: d["alpha-2"] }));
        await rtnLib.addMany(db, cfg.userobjects, countryCodeName);
        let count_ = await rtnLib.count(db, cfg.userobjects);
        console.log(
        `there are now ${count_} documents currently in the countries collection`
        );

        const code = argv.code;
        let countryFullName = await rtnLib.findOne(db, cfg.userobjects, { code });
        if(countryFullName != null){
         console.log(`The code ${code} belongs to the country of ${countryFullName.name}`);
        }
        else {
         console.log(`The code ${code} is not a known country alpha-2 code. `);
        }
        process.exit(0);
      } catch (err) {
      console.log(err);
      process.exit(1);
      }
     };

dotEnvWrite();
