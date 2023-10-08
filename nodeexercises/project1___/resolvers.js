import * as p1 from "./project1_setup.js";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";

let db = await dbRtns.getDBInstance();

const resolvers = {
 project1_setup: async (args) => {
    return await p1.dotEnvWrite();
    }, 
alerts: async () => {
    return await dbRtns.findAll(db, cfg.userobjects, {}, {});
    },
alertsforregion: async (args) => {
    return await dbRtns.findAll(db, cfg.userobjects, { region: args.region }, {});
    },
alertsforsubregion: async (args) => {
    return await dbRtns.findAll(db, cfg.userobjects, { subregion: args.subregion }, {});
    },
    //const findUniqueValues = (db, coll, field) => db.collection(coll).distinct(field);
regions: async () => {
   return await dbRtns.findUniqueValues(db, cfg.userobjects, "region" )
   .then((regions) => {
     let result = [];
     regions.forEach((region) => {
       result.push(region);
     });
     return result;
   });
},
subregions: async () => {
    return await dbRtns.findUniqueValues(db, cfg.userobjects, "subregion" )
    .then((subregions) => {
      let result = [];
      subregions.forEach((subregion) => {
        result.push(subregion);
      });
      return result;
    });
 },

};
export { resolvers };