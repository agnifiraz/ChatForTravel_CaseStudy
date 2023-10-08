import * as p1 from "./project1_setup.js";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";

let db = await dbRtns.getDBInstance();

const resolvers = {
  advisories: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, cfg.advisoryobjects, {}, {});
  },
  advisorybyname: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, cfg.advisoryobjects, { name: args.name });
  },
  addadvisory: async (args) => {
    let db = await dbRtns.getDBInstance();
    var today = new Date();
    let countryCheck = await dbRtns.findOne(
      db,
      cfg.userobjects,
      { name: args.country },
      {}
    );
    let user = {
      name: args.name,
      country: args.country,
      text: countryCheck.text,
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.toLocaleTimeString(),
    };
    let results = await dbRtns.addOne(db, cfg.advisoryobjects, user);
    return results.acknowledged ? user : null;
  },
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

  project1_setup: async (args) => {
    return await p1.dotEnvWrite();
  },
  alerts: async () => {
    return await dbRtns.findAll(db, cfg.userobjects, {}, {});
  },
  alertsforregion: async (args) => {
    return await dbRtns.findAll(
      db,
      cfg.userobjects,
      { region: args.region },
      {}
    );
  },

  advisoryfortraveler: async (args) => {
    let nameCheck = await dbRtns.findAll(
      db,
      cfg.advisoryobjects,
      { name: args.name },
      {}
    );

    const uniqueNames = [...new Set(nameCheck.map((obj) => obj.name))];
    const arr = await Promise.all(
      uniqueNames.map(async (name) => {
        const result = await dbRtns.findAll(
          db,
          cfg.advisoryobjects,
          { name },
          {}
        );
        return result;
      })
    );

    return arr.flat();
    // let arr = [];
    // for (const element of nameCheck) {
    //   const result = await dbRtns.findAll(
    //     db,
    //     cfg.advisoryobjects,
    //     { name: element.name },
    //     {}
    //   );
    //   arr = arr.concat(result);
    // }
    // return arr;
  },

  advisoryforregion: async (args) => {
    let regionCheck = await dbRtns.findAll(
      db,
      cfg.userobjects,
      { region: args.region },
      {}
    );

    let arr = [];
    for (const element of regionCheck) {
      const result = await dbRtns.findAll(
        db,
        cfg.advisoryobjects,
        { country: element.name },
        {}
      );
      arr = arr.concat(result);
    }
    return arr;
  },

  advisoryforsubregion: async (args) => {
    let subregionCheck = await dbRtns.findAll(
      db,
      cfg.userobjects,
      { subregion: args.subregion },
      {}
    );

    let arr = [];
    for (const element of subregionCheck) {
      const result = await dbRtns.findAll(
        db,
        cfg.advisoryobjects,
        { country: element.name },
        {}
      );
      arr = arr.concat(result);
    }
    return arr;
  },

  alertsforsubregion: async (args) => {
    return await dbRtns.findAll(
      db,
      cfg.userobjects,
      { subregion: args.subregion },
      {}
    );
  },
  //const findUniqueValues = (db, coll, field) => db.collection(coll).distinct(field);
  regions: async () => {
    return await dbRtns
      .findUniqueValues(db, cfg.userobjects, "region")
      .then((regions) => {
        let result = [];
        regions.forEach((region) => {
          result.push(region);
        });
        return result;
      });
  },
  travelers: async () => {
    return await dbRtns
      .findUniqueValues(db, cfg.advisoryobjects, "name")
      .then((travelers) => {
        let result = [];
        travelers.forEach((name) => {
          result.push(name);
        });
        return result;
      });
  },

  subregions: async () => {
    return await dbRtns
      .findUniqueValues(db, cfg.userobjects, "subregion")
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
