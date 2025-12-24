/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:fkpwK6hng0sB@ep-odd-pine-a5ocz2q3.us-east-2.aws.neon.tech/AI-Mock-Interviewer?sslmode=require",
  },
};
