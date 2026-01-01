import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use server-side env variable (no NEXT_PUBLIC_ prefix for security)
const databaseUrl =
  process.env.DRIZZLE_DB_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

// Only create db connection if we have a database URL
let db = null;
if (databaseUrl) {
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
}

export { db };
