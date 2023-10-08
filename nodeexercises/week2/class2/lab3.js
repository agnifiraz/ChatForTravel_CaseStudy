import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { provinces } from "./lab3_routines.js";
import { tranferPaymentsFromWebPromise } from "./lab3_routines.js";
import { fullNameAndProvincePromise } from "./lab3_routines.js";
import { transferPaymentForProvincePromise } from "./lab3_routines.js";
import { currencyFormatter } from "./lab3_routines.js";

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

let valueJsonData, tranferCost, value;
const promiseAllSettledAsyncProvince = async (firstname,lastname,province) => {
    try {
        let result = await fullNameAndProvincePromise(firstname,lastname,province );
        valueJsonData = await tranferPaymentsFromWebPromise();
        tranferCost = await transferPaymentForProvincePromise(valueJsonData, province);
        console.log(result, `It received ${currencyFormatter(tranferCost)} in transfer payments.\n `);
        console.log(`Transfer Payments by Province/Territory: \n`);
        let resultArray = await Promise.allSettled(
            provinces.map(async (prv)=>{
                let boldChar = prv.code === province ? `\x1b[1m`:`\x1b[0m`;
            try {
                let transferAmount = await transferPaymentForProvincePromise(valueJsonData, prv.code.toLowerCase());

                return {
                    res: `${boldChar}${prv.name} had a transfer payment of ${currencyFormatter(transferAmount)}`,
                }
            } catch (err) {
                return {
                    res: err
                }
            };
            })
        );
        resultArray.forEach(result => {
            result.value
                ? console.log(result.value.res)
                : console.log(result.value.res);
        });
    } 
    catch(err) {
    console.log(`Error ==> ${err}`);
    };
};
promiseAllSettledAsyncProvince(argv.firstname,argv.lastname,argv.province);


        //let resultArray = await Promise.allSettled([promiseAllSettledAllProvincePrint(valueJsonData, province)]);
 //         //return promiseAllSettledAllProvincePrint(valueJsonData, prv.code, province,prv.name);
                
        //     })
        // );
        // // resultArray.forEach((result) => {
        // //     result.value // resolve
        // //     ? console.log(result.value.allProvinces )
        // //     : console.log(result.reason.allProvinces );
        // // });



// let temp, Output;
                // temp =  await transferPaymentForProvincePromise(valueJsonData,prv.code.toLowerCase());
                // if(province== prv.code){
                //     let provincePromiseName = prv.name;
                //     Output =`\x1b[1m${provincePromiseName} had a transfer payment of ${currencyFormatter(temp)}`;
                //     console.log(Output);
                // }
                // else{
                //     let provincePromiseName = prv.name;
                //     Output = `\x1b[0m${provincePromiseName} had a transfer payment of ${currencyFormatter(temp)}`;
                //     console.log(Output);
                // }