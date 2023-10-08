import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { provinces } from "./lab2_routines.js";
import { tranferPaymentsFromWebPromise } from "./lab2_routines.js";
import { fullNameAndProvincePromise } from "./lab2_routines.js";
import { transferPaymentForProvincePromise } from "./lab2_routines.js";
import { currencyFormatter } from "./lab2_routines.js";

// Note: hideBin is a shorthand for process.argv.slice(2)
// - bypass the first two arguments
var provincesList = [];
provinces.forEach(provinces => {
    provincesList.push(provinces.code);
});

const argv = yargs(hideBin(process.argv))
 .options({
 firstname: {
    demandOption: true,
    alias: "fname",
    describe: "Resident's first name",
    string: true,
 },
 lastname: {
    demandOption: true,
    alias: "lname",
    describe: "Resident's last name",
    string: true,
 },
 province: {
    demandOption: true,
    alias: "prov",
    describe: "Resident's home province",
    string: true,
    choices: provincesList,    
    },
 })
 .help()
 .alias("help", "h")
 .parse();

 let value;
 fullNameAndProvincePromise(argv.firstname,argv.lastname,argv.province)
.then((result) => {
    value = result;
        return tranferPaymentsFromWebPromise();
    })
.then((gocData) => {
    return transferPaymentForProvincePromise(gocData, argv.province); // will fire catch
    })
    .then((tranferCost) => {
        console.log(value, `It received ${currencyFormatter(tranferCost)} in transfer payments. `)
    })
    .catch((err) => {
        console.log(`Error ==> ${err}`);
});
        