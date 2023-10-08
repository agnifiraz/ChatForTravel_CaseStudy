import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as rtnLib from "./iso_country_routines.js";
import * as cfg from "./config.js";

const argv = yargs(hideBin(process.argv))
 .options({
 refresh: {
    describe: "is a fresh copy from the web required?",
    Boolean: true,
 },   
 })
 .help()
 .alias("help", "h")
 .parse();

const dotEnvWrite = async () => {
    try {

        if(argv.refresh){ 
            outPut();
        }else{
            let fileStats = await rtnLib.fileStatsFromFSPromise(cfg.userobjects);
            if (!fileStats) {
                outPut();

            } else {
                console.log(`An existing ${cfg.userobjects} file was read from the file system`);
                let readfile = await rtnLib.readFileFromFSPromise(cfg.userobjects);
                console.log(readfile);   
         }
    }} catch (err) {
    console.log(err);
    console.log(`${cfg.userobjects} file not written to file system`);
    }
   };

   const outPut = async () => {
        let country = [];
        let rawData = await rtnLib.getJSONFromWWWPromise(cfg.rawdata);
        country.push(rawData);
        await rtnLib.writeFileFromFSPromise(cfg.userobjects, country);
        console.log(`A new ${cfg.userobjects} file was written.`);
        let readfile = await rtnLib.readFileFromFSPromise(cfg.userobjects);
        console.log(readfile);

   }
   dotEnvWrite();
