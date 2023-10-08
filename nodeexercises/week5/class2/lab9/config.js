import { config } from 'dotenv';
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const collection = process.env.COLLECTION;
export const port = process.env.PORT;
export const rawdata = process.env.ISOCOUNTRIES;
export const graphql = process.env.GRAPHQLURL;

