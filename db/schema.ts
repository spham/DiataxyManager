import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'tutorial', 'howto', 'reference', 'explanation'
  userRole: text("user_role").notNull(), // 'business', 'developer', 'ops'
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  order: integer("order").default(0),
  templateId: integer("template_id")
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'tutorial', 'howto', 'reference', 'explanation'
  userRole: text("user_role").notNull(), // 'business', 'developer', 'ops'
  content: text("content").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // 'completion', 'contribution', 'exploration'
  requirement: text("requirement").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  documentId: integer("document_id").notNull(),
  status: text("status").notNull(), // 'not_started', 'in_progress', 'completed'
  lastReadAt: timestamp("last_read_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent").default(0) // in seconds
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull()
});

// Document schemas
export const insertDocumentSchema = createInsertSchema(documents);
export const selectDocumentSchema = createSelectSchema(documents);
export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;

// Template schemas
export const insertTemplateSchema = createInsertSchema(templates);
export const selectTemplateSchema = createSelectSchema(templates);
export type InsertTemplate = typeof templates.$inferInsert;
export type SelectTemplate = typeof templates.$inferSelect;

// Badge schemas
export const insertBadgeSchema = createInsertSchema(badges);
export const selectBadgeSchema = createSelectSchema(badges);
export type InsertBadge = typeof badges.$inferInsert;
export type SelectBadge = typeof badges.$inferSelect;

// Progress schemas
export const insertProgressSchema = createInsertSchema(userProgress);
export const selectProgressSchema = createSelectSchema(userProgress);
export type InsertProgress = typeof userProgress.$inferInsert;
export type SelectProgress = typeof userProgress.$inferSelect;

// Relations
export const relations = {
  documents: {
    template: (documents, templates) => ({
      references: [
        { columns: [documents.templateId], foreignColumns: [templates.id] },
        { columns: [documents.parentId], foreignColumns: [documents.id] }
      ],
    }),
  },
  userProgress: {
    document: (userProgress, documents) => ({
      references: [{ columns: [userProgress.documentId], foreignColumns: [documents.id] }],
    }),
  },
  userBadges: {
    badge: (userBadges, badges) => ({
      references: [{ columns: [userBadges.badgeId], foreignColumns: [badges.id] }],
    }),
  },
};