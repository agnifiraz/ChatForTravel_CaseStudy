import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
const resolvers = {
 countries: async () => {
 let db = await dbRtns.getDBInstance();
 return await dbRtns.findAll(db, cfg.collection, {}, {});
 },
countrybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { name: args.name });
    }, 
countrybycode: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.collection, { code: args.code });
    },   
addcountry: async args => {
    let db = await dbRtns.getDBInstance();
    let country = {code: args.code, name: args.name};
    let results = await dbRtns.addOne(db, cfg.collection,country);
    return results.acknowledged ? country : null;
    },
};
export { resolvers };