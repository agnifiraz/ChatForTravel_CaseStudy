// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in JSON.
const dumpJson = async () => {
 const srcAddr =
 "https://open.alberta.ca/dataset/18801116-2014-43df-84fd-408bc2382051/resource/27cda8cc-1833-4034-8005-833a8faf33e1/download/rows.json";
 // Create a currency formatter.
 try {
 const response = await got(srcAddr, { responseType: "json" });
 // strip out the Ontario amount
 const  publication = "publicationGroup"
 const viewCount = "viewCount"
 const rowsUpdatedBy = "rowsUpdatedBy"
 const name1 = "name"
 let publicationGroup = response.body.meta.view[publication];
 let count = response.body.meta.view[viewCount];
 let rows = response.body.meta.view[rowsUpdatedBy];
 let name = response.body.meta.view[name1];
 // dump to the console using template literal
 console.log(`This is about Alberta's ${name} and its viewCount is ${count} and the  ${publication}  of this dataset was ${publicationGroup}`);
 console.log(`Alberta's ${name} rows updated by ${rows} `);
 } catch (error) {
 console.log(error);
 //=> 'Internal server error ...'
 }
};
dumpJson();
