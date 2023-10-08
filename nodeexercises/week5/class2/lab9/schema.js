const schema = ` 
type Query {
 countries: [Country],
 countrybycode(code: String): Country,
 countrybyname(name: String): Country
 },
type Country {
 code: String
 name: String
 },
 type Mutation {
    addcountry( code: String, name: String): Country
   }
`;
export { schema };