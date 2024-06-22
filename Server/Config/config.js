import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.VITE_HOST,
    port: process.env.VITE_PORT,
    user: process.env.VITE_USER,
    password: process.env.VITE_PASSWORD,
    database: process.env.VITE_DB,
  })
  .promise();

export default pool;
