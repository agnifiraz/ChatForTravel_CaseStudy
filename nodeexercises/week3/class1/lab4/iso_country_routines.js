import got from "got";
import {promises as fsp} from "fs";
import * as cfg from "./config.js";

const fileStatsFromFSPromise = async (fname) => {
    let stats;
    try {
    stats = await fsp.stat(fname);
    } catch (error) {
    error.code === "ENOENT" // doesn't exist
    ? console.log(cfg.userobjects + " does not exist")
    : console.log(error.message);
    }
    return stats;
};

const getJSONFromWWWPromise = (url) => got(url).json();

const writeFileFromFSPromise = async (fname, ...rawdata) => {
    let filehandle;
    try {
    filehandle = await fsp.open(fname, "w");
    let dataToWrite = "";
    rawdata.forEach((element) => (dataToWrite += JSON.stringify(element))); // concatentate
    await fsp.writeFile(fname, dataToWrite); // returns promise
    } catch (err) {
    console.log(err);
    } finally {
    if (filehandle !== undefined) {
    await filehandle.close();
    }
    }
};

const readFileFromFSPromise = async (fname) => {
    let rawData, date;
    let infoArray;
    let elementArray;
    try {
    rawData = await fsp.readFile(fname); // returns promise
    infoArray = await getJSONFromWWWPromise(cfg.rawdata);
    elementArray = (infoArray).length;
    date = `${cfg.userobjects} was created on `+ (await fsp.stat(fname)).ctime.toDateString() + " " ;
    date = date + (await fsp.stat(fname)).ctime.toTimeString() + ".";

    } catch (error) {
    console.log(error);
    } finally {
    if (rawData !== undefined)
    {   
        let result = `${date} \n`; 
        return result + `There are ${elementArray} codes in ${fname}`;
    }    
}
};

export {
    readFileFromFSPromise,
    writeFileFromFSPromise,
    fileStatsFromFSPromise,
    getJSONFromWWWPromise,
   };
   