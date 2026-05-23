import db from './src/db';
import * as fs from 'fs';

try {
  const projects = db.prepare('SELECT * FROM projects').all();
  const skills = db.prepare('SELECT * FROM skills').all();
  const stats = db.prepare('SELECT * FROM dashboard_stats').all();
  const chartData = db.prepare('SELECT * FROM dashboard_chart_data').all();
  const techDistribution = db.prepare('SELECT * FROM tech_distribution').all();
  const certificates = db.prepare('SELECT * FROM certificates').all();
  const experience = db.prepare('SELECT * FROM experience').all();
  const cvUrl = db.prepare("SELECT value FROM settings WHERE key = 'cv_url'").get() as { value: string };

  const data = {
    projects,
    skills: skills.map((s: any) => ({ ...s, items: s.items.split(',') })),
    stats,
    chartData,
    techDistribution,
    certificates,
    experience,
    cvUrl: cvUrl?.value || ""
  };

  fs.writeFileSync('db_content.json', JSON.stringify(data, null, 2), 'utf8');
  console.log("Successfully extracted database to db_content.json in UTF-8 format!");
} catch (error) {
  console.error(error);
}
