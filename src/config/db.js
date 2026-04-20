import dotenv from "dotenv";
import { Pool } from "@neondatabase/serverless";

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});