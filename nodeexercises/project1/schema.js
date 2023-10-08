const schema = ` 
type Query {
   advisories: [Advisory],
   advisorybyname(name: String): Advisory
   countries: [Country],
   countrybycode(code: String): Country,
   countrybyname(name: String): Country,
   alerts: [Alert],
   regions: [String],
   travelers: [String],
   subregions: [String],
   alertsforregion(region: String): [Alert],
   advisoryforregion(region: String): [Advisory],
   advisoryfortraveler(name: String): [Advisory],
   alertsforsubregion(subregion: String): [Alert],
   advisoryforsubregion(subregion: String): [Advisory],
   project1_setup(results: String): Results
 },
 type Country {
  code: String
  name: String
  },
type Advisory {
  name: String
  country: String
  text: String
  date: String
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
},
type Mutation {
  addadvisory(name: String, country: String): Advisory
 } 
`;
export { schema };
