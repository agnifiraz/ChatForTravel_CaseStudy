const schema = ` 
type Query {
   alerts: [Alert],
   regions: [String],
   subregions: [String],
   alertsforregion(region: String): [Alert],
   alertsforsubregion(subregion: String): [Alert],
   project1_setup(results: String): Results
 },
 type Results {
   results: String
   },
type Alert {
  country: String
  name: String
  text: String
  date: String
  region: String
  subregion: String
}
`;
export { schema };