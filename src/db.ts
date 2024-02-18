import { Pool } from "pg";
import { config } from "dotenv";
config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
