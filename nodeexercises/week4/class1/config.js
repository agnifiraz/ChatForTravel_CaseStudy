import { config } from 'dotenv';
config();
export const atlas = process.env.DBURL;
export const appdb = process.env.DB;
export const rawdata = process.env.ISOCOUNTRIES;
export const userobjects = process.env.COLLECTION;
