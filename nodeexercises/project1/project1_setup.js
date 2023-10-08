import * as cfg from "./config.js";
import * as rtnLib from "./db_routines.js";

let results = "";

const dotEnvWrite = async () => {
  try {
    results = "";
    let rawData = await rtnLib.getJSONFromWWWPromise(cfg.rawdata);
    let alertData = await rtnLib.getJSONFromWWWPromise(cfg.alertJson);
    const db = await rtnLib.getDBInstance();

    let dlt = await rtnLib.deleteAll(db, cfg.userobjects);
    //  console.log(
    //  `Deleted ${dlt.deletedCount} documents from the countries collection`
    //  );
    results += `Deleted ${dlt.deletedCount} documents from the ${cfg.userobjects} collection. `;
    results += `Retrieved Alert JSON from remote web site. `;
    results += `Retrieved Country JSON from GitHub. `;

    const countryCodeCheck = rawData.map((d) => d["alpha-2"]);

    let alertAllInfoArray = [];
    for (let i = 0; i < rawData.length; i++) {
      if (alertData.data[countryCodeCheck[i]]) {
        let alertInfo = alertData.data[countryCodeCheck[i]];
        let countryCodeName = {
          country: countryCodeCheck[i],
          name: rawData[i].name,
          text: alertInfo["eng"]["advisory-text"],
          date: alertInfo["date-published"].date,
          region: rawData[i]["region"],
          subregion: rawData[i]["sub-region"],
        };
        alertAllInfoArray.push(countryCodeName);
      } else {
        let countryCodeName = {
          country: countryCodeCheck[i],
          name: rawData[i].name,
          text: "No travel alerts",
          date: "",
          region: rawData[i]["region"],
          subregion: rawData[i]["sub-region"],
        };
        alertAllInfoArray.push(countryCodeName);
      }
    }

    await rtnLib.addMany(db, cfg.userobjects, alertAllInfoArray);

    let count_ = await rtnLib.count(db, cfg.userobjects);
    //  console.log(
    //  `there are now ${count_} documents currently in the ${cfg.userobjects} collection`
    //  );

    results += `Added ${count_} documents to the ${cfg.userobjects} collection. `;
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    return { results: results };
  }
};
export { dotEnvWrite };
//dotEnvWrite();
