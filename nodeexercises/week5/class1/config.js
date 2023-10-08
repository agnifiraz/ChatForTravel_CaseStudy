import { config } from 'dotenv';
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const userobjects = process.env.COLLECTION;
export const port = process.env.PORT;
export const rawdata = process.env.ISOCOUNTRIES;

