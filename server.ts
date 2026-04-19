import express from "express";
import { createServer as createViteServer } from "vite";
import db from "./src/db";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Routes
  app.get("/api/data", (req, res) => {
    try {
      const projects = db.prepare('SELECT * FROM projects').all();
      const skills = db.prepare('SELECT * FROM skills').all();
      const stats = db.prepare('SELECT * FROM dashboard_stats').all();
      const chartData = db.prepare('SELECT * FROM dashboard_chart_data').all();
      const techDistribution = db.prepare('SELECT * FROM tech_distribution').all();
      const certificates = db.prepare('SELECT * FROM certificates').all();
      const experience = db.prepare('SELECT * FROM experience').all();
      const cvUrl = db.prepare('SELECT value FROM settings WHERE key = ?').get('cv_url') as { value: string };

      res.json({
        projects,
        skills: skills.map((s: any) => ({ ...s, items: s.items.split(',') })),
        stats,
        chartData,
        techDistribution,
        certificates,
        experience,
        cvUrl: cvUrl?.value || ""
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const savedPassword = db.prepare('SELECT value FROM settings WHERE key = ?').get('password') as { value: string };
    
    if (password === savedPassword.value) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Mot de passe incorrect" });
    }
  });

  app.post("/api/update-stats", (req, res) => {
    const { stats } = req.body;
    const updateStat = db.prepare('UPDATE dashboard_stats SET value = ?, trend = ? WHERE label = ?');
    const transaction = db.transaction((statsList) => {
      for (const s of statsList) updateStat.run(s.value, s.trend, s.label);
    });
    transaction(stats);
    res.json({ success: true });
  });

  app.post("/api/update-skills", (req, res) => {
    const { skills } = req.body;
    const updateSkill = db.prepare('UPDATE skills SET items = ? WHERE category = ?');
    const transaction = db.transaction((skillsList) => {
      for (const s of skillsList) updateSkill.run(s.items.join(','), s.category);
    });
    transaction(skills);
    res.json({ success: true });
  });

  app.post("/api/projects", (req, res) => {
    const { action, project } = req.body;
    if (action === 'add') {
      db.prepare('INSERT INTO projects (name, description, image, tags, link) VALUES (?, ?, ?, ?, ?)')
        .run(project.name, project.description, project.image, project.tags, project.link);
    } else if (action === 'delete') {
      db.prepare('DELETE FROM projects WHERE id = ?').run(project.id);
    }
    res.json({ success: true });
  });

  app.post("/api/certificates", (req, res) => {
    const { action, certificate } = req.body;
    if (action === 'add') {
      db.prepare('INSERT INTO certificates (name, issuer, date, description, image, link) VALUES (?, ?, ?, ?, ?, ?)')
        .run(certificate.name, certificate.issuer, certificate.date, certificate.description, certificate.image, certificate.link);
    } else if (action === 'delete') {
      db.prepare('DELETE FROM certificates WHERE id = ?').run(certificate.id);
    }
    res.json({ success: true });
  });

  app.post("/api/update-cv", (req, res) => {
    const { cvUrl } = req.body;
    db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(cvUrl, 'cv_url');
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
