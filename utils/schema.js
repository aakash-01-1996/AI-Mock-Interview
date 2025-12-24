import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey().notNull(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPostion: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});
