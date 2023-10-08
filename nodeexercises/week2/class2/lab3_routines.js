import got from "got";
const provinces = [
 { code: "NS", name: "Nova Scotia" },
 { code: "NL", name: "Newfoundland" },
 { code: "NB", name: "New Brunswick" },
 { code: "PE", name: "Prince Edward Island" },
 { code: "QC", name: "Quebec" },
 { code: "ON", name: "Ontario" },
 { code: "MB", name: "Manitoba"},
 { code: "SK", name: "Saskatchewan" },
 { code: "AB", name: "Alberta" },
 { code: "BC", name: "British Columbia" },
 { code: "NT", name: "North West Territories" },
 { code: "NU", name: "Nunavut" },
 { code: "YT", name: "Yukon Territory" },
];
const FISCALYEAR = "2022-2023";

// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
 new Intl.NumberFormat("en-US", {
 style: "currency",
 currency: "USD",
 minimumFractionDigits: 0,
 }).format(numberToFormat);

var provinceName;
var provCode;
 const fullNameAndProvincePromise = (fname,lname,provinceCode) =>{
    return new Promise((resolve, reject) => {
        if (fname && lname && provinceCode) {
            provinces.forEach(provs => {
                if(provinceCode == provs.code){
                    provinceName = provs.name;
                    provCode = provs.code;
                }
            });
            let data = `${fname}, ${lname} lives in ${provinceName}.`;
            resolve(data);
        } else {
        reject('another error');
        }
    });
 };

 
const tranferPaymentsFromWebPromise = () => {
    let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
    return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
    .then((response) => {
    resolve(response.body);
    })
    .catch((err) => {
    console.log(`Error ==> ${err}`);
    reject(err);
    });
    });
};

const transferPaymentForProvincePromise = (gocData, provCode) => {
    return new Promise((resolve, reject) => {
    if(gocData && provCode){
        provCode = provCode.toLowerCase();
        let temp = gocData.ccbf[provCode][FISCALYEAR];
    resolve(temp);
    } 
    else{
        console.log(`Error ==> ${err}`);
        reject(err);
    }
    })
    .catch((err) => {
    console.log(`Error ==> ${err}`);
    reject(err);
    });
};

export {
 provinces,
 currencyFormatter,
 tranferPaymentsFromWebPromise,
 fullNameAndProvincePromise,
 transferPaymentForProvincePromise,
 //promiseAllSettledAllProvincePrint,
};



// var  provincePromiseCode;
// const promiseAllSettledAllProvincePrint =  (gocData, allCode,provinceCode,prvName) => {
//         return new Promise(async (resolve, reject) => {
//         if(provinceCode){
//             let temp, Output;
//             temp = await transferPaymentForProvincePromise(gocData,allCode.toLowerCase());
//             if(provinceCode== allCode){
//                 let provincePromiseName = prvName;
//                 Output =`\x1b[1m${provincePromiseName} had a transfer payment of ${currencyFormatter(temp)}`;
//                 //console.log(Output);
//             }
//             else{
//                 let provincePromiseName = prvName;
//                 Output = `\x1b[0m${provincePromiseName} had a transfer payment of ${currencyFormatter(temp)}`;
//                // console.log(Output);
//             }
//         resolve({allProvinces: Output});
//         } 
//         else{
//             console.log(`Error ==> ${err}`);
//             reject(err);
//         }
//         })
//     .catch((err) => {
//     console.log(`Error ==> ${err}`);
//     reject(err);
//     });
// };