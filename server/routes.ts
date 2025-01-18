import type { Express } from "express";
import { createServer } from "http";
import { eq, and } from "drizzle-orm";
import { db } from "@db";
import { documents, templates, userProgress, badges, userBadges } from "@db/schema";

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

  // Get progress statistics
  app.get("/api/progress/stats", async (req, res) => {
    const userId = 1; // TODO: Get from auth session

    // Get all documents count by category
    const allDocs = await db.select().from(documents);

    // Get user progress
    const progress = await db.select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    // Calculate category progress
    const categories = ['tutorial', 'howto', 'reference', 'explanation'];
    const categoryProgress = categories.map(category => {
      const total = allDocs.filter(d => d.category === category).length;
      const completed = progress.filter(p => 
        p.status === 'completed' && 
        allDocs.find(d => d.id === p.documentId)?.category === category
      ).length;
      return { category, total, completed };
    });

    // Get recent badges
    const userBadgesData = await db.select()
      .from(userBadges)
      .where(eq(userBadges.userId, userId));

    const recentBadges = await db.select()
      .from(badges)
      .where(and(
        eq(badges.id, userBadgesData[0]?.badgeId),
        // Add more badge IDs here
      ));

    // Get next available badges
    const nextAchievements = await db.select()
      .from(badges)
      .where(and(
        eq(badges.category, 'completion'),
        // Add more filters for unearned badges
      ));

    res.json({
      categories: categoryProgress,
      recentBadges,
      nextAchievements,
      totalProgress: progress.length / allDocs.length
    });
  });

  // Update document progress
  app.post("/api/progress/:documentId", async (req, res) => {
    const userId = 1; // TODO: Get from auth session
    const documentId = parseInt(req.params.documentId);
    const { status, timeSpent } = req.body;

    const progress = await db.insert(userProgress)
      .values({
        userId,
        documentId,
        status,
        timeSpent,
        completedAt: status === 'completed' ? new Date() : null
      })
      .returning();

    // Check and award badges
    await checkAndAwardBadges(userId);

    res.json(progress[0]);
  });

  async function checkAndAwardBadges(userId: number) {
    const progress = await db.select().from(userProgress)
      .where(eq(userProgress.userId, userId));

    const existingBadges = await db.select().from(userBadges)
      .where(eq(userBadges.userId, userId));

    // Example badge checks
    if (progress.filter(p => p.status === 'completed').length >= 5) {
      // Award "Quick Learner" badge if not already awarded
      const quickLearnerBadge = await db.select().from(badges)
        .where(eq(badges.name, 'Quick Learner'));

      if (quickLearnerBadge[0] && !existingBadges.find(b => b.badgeId === quickLearnerBadge[0].id)) {
        await db.insert(userBadges)
          .values({
            userId,
            badgeId: quickLearnerBadge[0].id
          });
      }
    }

    // Add more badge checks here
  }

  return httpServer;
}