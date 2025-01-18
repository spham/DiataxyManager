import type { Express } from "express";
import { createServer } from "http";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { documents } from "@db/schema";

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
    const { title, content, category } = req.body;
    const doc = await db.insert(documents).values({
      title,
      content,
      category,
    }).returning();
    res.json(doc[0]);
  });

  // Update document
  app.put("/api/documents/:id", async (req, res) => {
    const { title, content, category } = req.body;
    const doc = await db.update(documents)
      .set({ title, content, category, updatedAt: new Date() })
      .where(eq(documents.id, parseInt(req.params.id)))
      .returning();
    if (doc.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(doc[0]);
  });

  return httpServer;
}
