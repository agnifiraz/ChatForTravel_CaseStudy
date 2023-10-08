// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
 const srcAddr =
 "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";
 // Create a currency formatter.
 const formatter = new Intl.NumberFormat("en-US", {
 style: "currency",
 currency: "USD",
 minimumFractionDigits: 0,
 });
 try {
 const response = await got(srcAddr, { responseType: "json" });
 // strip out the Ontario amount
 const  FISCALYEAR = "2022-2023"
 let alb = response.body.ccbf.ab[FISCALYEAR];
 let bc = response.body.ccbf.bc[FISCALYEAR];
 let different;

 if(bc>alb){ different = bc - alb; }
 else{ different = alb - bc; }

 // format to currency
 alb = formatter.format(alb);
 bc = formatter.format(bc);
 different = formatter.format(different);

 // dump to the console using template literal
 console.log(`B.C's transfer amount for ${FISCALYEAR} was ${bc}`);
 console.log(`Alberta’s's transfer amount for ${FISCALYEAR} was ${alb}`);

 if(bc>alb){  console.log(`B.C received ${different} more than Alberta for ${FISCALYEAR}`);}
 else{ console.log(`Alberta received ${different} more than B.C for ${FISCALYEAR}`); } 


 } catch (error) {
 console.log(error);
 //=> 'Internal server error ...'
 }
};
dumpJson();
