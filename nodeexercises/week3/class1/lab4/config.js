import { config } from "dotenv";
config();
export const rawdata = process.env.ISOCOUNTRIES;
export const userobjects = process.env.COUNTRIES;