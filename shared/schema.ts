import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const videoProjects = pgTable("video_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  script: text("script").notNull(),
  duration: integer("duration").notNull().default(30), // in seconds
  style: text("style").notNull().default("modern"),
  aspectRatio: text("aspect_ratio").notNull().default("16:9"),
  voiceOver: text("voice_over").notNull().default("ai_female"),
  template: text("template").notNull().default("business"),
  status: text("status").notNull().default("draft"), // draft, generating, completed, failed
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  category: text("category").notNull(),
  isActive: integer("is_active").notNull().default(1),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVideoProjectSchema = createInsertSchema(videoProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateVideoProjectSchema = createInsertSchema(videoProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertVideoProject = z.infer<typeof insertVideoProjectSchema>;
export type UpdateVideoProject = z.infer<typeof updateVideoProjectSchema>;
export type VideoProject = typeof videoProjects.$inferSelect;

export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;
