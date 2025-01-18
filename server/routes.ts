import type { Express } from "express";
import { createServer } from "http";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { documents, templates } from "@db/schema";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Get all documents
  app.get("/api/documents", async (_req, res) => {
    const docs = await db.select().from(documents);
    res.json(docs);
  });

  // Get single document
  app.get("/api/documents/:id", async (req, res) => {
    const doc = await db.select().from(documents).where(eq(documents.id, parseInt(req.params.id)));
    if (doc.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(doc[0]);
  });

  // Create document
  app.post("/api/documents", async (req, res) => {
    const { title, content, category, templateId } = req.body;
    const doc = await db.insert(documents).values({
      title,
      content,
      category,
      templateId: templateId || null,
    }).returning();
    res.json(doc[0]);
  });

  // Update document
  app.put("/api/documents/:id", async (req, res) => {
    const { title, content, category } = req.body;
    const doc = await db.update(templates)
      .set({ title, content, category, updatedAt: new Date() })
      .where(eq(documents.id, parseInt(req.params.id)))
      .returning();
    if (doc.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(doc[0]);
  });

  // Get all templates
  app.get("/api/templates", async (_req, res) => {
    const allTemplates = await db.select().from(templates);
    res.json(allTemplates);
  });

  // Get templates by category
  app.get("/api/templates/:category", async (req, res) => {
    const categoryTemplates = await db.select()
      .from(templates)
      .where(eq(templates.category, req.params.category));
    res.json(categoryTemplates);
  });

  // Create template
  app.post("/api/templates", async (req, res) => {
    const { name, category, content } = req.body;
    const template = await db.insert(templates)
      .values({ name, category, content, isDefault: false })
      .returning();
    res.json(template[0]);
  });

  // Update template
  app.put("/api/templates/:id", async (req, res) => {
    const { name, content } = req.body;
    const template = await db.update(templates)
      .set({ 
        name, 
        content,
        updatedAt: new Date()
      })
      .where(eq(templates.id, parseInt(req.params.id)))
      .returning();
    if (template.length === 0) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template[0]);
  });

  return httpServer;
}