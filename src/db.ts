import Database from 'better-sqlite3';

const db = new Database('portfolio.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    image TEXT,
    tags TEXT,
    link TEXT
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    issuer TEXT,
    date TEXT,
    image TEXT,
    description TEXT,
    link TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    items TEXT
  );

  CREATE TABLE IF NOT EXISTS dashboard_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    value TEXT,
    trend TEXT,
    icon_type TEXT
  );

  CREATE TABLE IF NOT EXISTS dashboard_chart_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    code INTEGER,
    projects INTEGER
  );

  CREATE TABLE IF NOT EXISTS tech_distribution (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT,
    value INTEGER,
    fullMark INTEGER
  );
`);

// Seed initial data if empty
const settingsCount = db.prepare('SELECT count(*) as count FROM settings').get() as { count: number };
if (settingsCount.count === 0) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('password', 'Martin123');
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('cv_url', '');
  
  // Seed projects
  const initialProjects = [
    { name: "UPB Student's", description: "Plateforme de gestion pour les étudiants de l'UPB.", image: "https://picsum.photos/seed/upb_students/800/600", tags: "React,Node.js,SQLite", link: "#" },
    { name: "UPB La bibliothèque", description: "Système de gestion de bibliothèque numérique.", image: "https://picsum.photos/seed/upb_lib/800/600", tags: "Java,Spring Boot,PostgreSQL", link: "#" },
    { name: "Metro", description: "Application de suivi en temps réel du réseau de métro.", image: "https://picsum.photos/seed/metro/800/600", tags: "Flutter,Firebase,Maps API", link: "#" }
  ];
  const insertProject = db.prepare('INSERT INTO projects (name, description, image, tags, link) VALUES (?, ?, ?, ?, ?)');
  initialProjects.forEach(p => insertProject.run(p.name, p.description, p.image, p.tags, p.link));

  // Seed skills
  const initialSkills = [
    { category: "Développement", items: "React,TypeScript,Java,Python,Flutter,HTML & CSS,Tailwind CSS" },
    { category: "Data & BI", items: "SQL,Analyse de données" },
    { category: "Outils", items: "Git,GitHub,n8n,SQL,Power BI,Excel,R Studio" }
  ];
  const insertSkill = db.prepare('INSERT INTO skills (category, items) VALUES (?, ?)');
  initialSkills.forEach(s => insertSkill.run(s.category, s.items));

  // Seed dashboard stats
  const initialStats = [
    { label: "Projets", value: "5+", trend: "+10%", icon_type: "briefcase" },
    { label: "Lignes de code", value: "15k", trend: "+2k", icon_type: "code" },
    { label: "Techs", value: "5+", trend: "+2", icon_type: "cpu" },
    { label: "KPI Perso", value: "98%", trend: "Optimal", icon_type: "activity" }
  ];
  const insertStat = db.prepare('INSERT INTO dashboard_stats (label, value, trend, icon_type) VALUES (?, ?, ?, ?)');
  initialStats.forEach(s => insertStat.run(s.label, s.value, s.trend, s.icon_type));

  // Seed chart data
  const initialChartData = [
    { name: 'Jan', code: 4000, projects: 2 },
    { name: 'Mar', code: 3000, projects: 3 },
    { name: 'May', code: 2000, projects: 5 },
    { name: 'Jul', code: 2780, projects: 4 },
    { name: 'Sep', code: 1890, projects: 6 },
    { name: 'Nov', code: 2390, projects: 8 },
  ];
  const insertChart = db.prepare('INSERT INTO dashboard_chart_data (name, code, projects) VALUES (?, ?, ?)');
  initialChartData.forEach(c => insertChart.run(c.name, c.code, c.projects));

  // Seed tech distribution
  const initialTechData = [
    { subject: 'React', value: 95, fullMark: 100 },
    { subject: 'TypeScript', value: 90, fullMark: 100 },
    { subject: 'Node.js', value: 85, fullMark: 100 },
    { subject: 'SQL', value: 80, fullMark: 100 },
    { subject: 'UI/UX', value: 85, fullMark: 100 },
    { subject: 'Data Eng', value: 75, fullMark: 100 },
  ];
  const insertTech = db.prepare('INSERT INTO tech_distribution (subject, value, fullMark) VALUES (?, ?, ?)');
  initialTechData.forEach(t => insertTech.run(t.subject, t.value, t.fullMark));

  // Seed certificates
  const initialCerts = [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Janvier 2024", description: "Certification validant la capacité à concevoir des systèmes distribués sur AWS.", image: "https://picsum.photos/seed/aws/800/600", link: "#" },
    { name: "Google Data Analytics Professional", issuer: "Google", date: "Mars 2023", description: "Maîtrise de l'analyse de données avec SQL, R et Tableau.", image: "https://picsum.photos/seed/google/800/600", link: "#" },
    { name: "CompTIA Security+", issuer: "CompTIA", date: "Décembre 2023", description: "Validation des compétences de base en cybersécurité et conformité.", image: "https://picsum.photos/seed/security/800/600", link: "#" }
  ];
  const insertCert = db.prepare('INSERT INTO certificates (name, issuer, date, description, image, link) VALUES (?, ?, ?, ?, ?, ?)');
  initialCerts.forEach(c => insertCert.run(c.name, c.issuer, c.date, c.description, c.image, c.link));
}

// Ensure certificates are seeded if table is empty (even if settings exist)
const certsCount = db.prepare('SELECT count(*) as count FROM certificates').get() as { count: number };
if (certsCount.count === 0) {
  const initialCerts = [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Janvier 2024", description: "Certification validant la capacité à concevoir des systèmes distribués sur AWS.", image: "https://picsum.photos/seed/aws/800/600", link: "#" },
    { name: "Google Data Analytics Professional", issuer: "Google", date: "Mars 2023", description: "Maîtrise de l'analyse de données avec SQL, R et Tableau.", image: "https://picsum.photos/seed/google/800/600", link: "#" },
    { name: "CompTIA Security+", issuer: "CompTIA", date: "Décembre 2023", description: "Validation des compétences de base en cybersécurité et conformité.", image: "https://picsum.photos/seed/security/800/600", link: "#" }
  ];
  const insertCert = db.prepare('INSERT INTO certificates (name, issuer, date, description, image, link) VALUES (?, ?, ?, ?, ?, ?)');
  initialCerts.forEach(c => insertCert.run(c.name, c.issuer, c.date, c.description, c.image, c.link));
}

// Experiences
db.exec(`
  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    title TEXT,
    subtitle TEXT,
    date TEXT,
    description TEXT
  )
`);

const experienceCount = db.prepare('SELECT count(*) as count FROM experience').get() as { count: number };
if (experienceCount.count === 0) {
  const insertExperience = db.prepare('INSERT INTO experience (type, title, subtitle, date, description) VALUES (?, ?, ?, ?, ?)');
  const defaultExperience = [
    {
      type: 'exp',
      title: 'Chef Informaticien',
      subtitle: 'Concours Génie UPB',
      date: '2024 - Présent',
      description: 'Responsable de l\'équipe informatique lors du concours Génie UPB. Supervision du développement de solutions innovantes et coordination technique des projets.'
    },
    {
      type: 'edu',
      title: 'Licence en MIAGE',
      subtitle: 'Université Polytechnique de Bingerville (UPB)',
      date: '2021 - 2024',
      description: 'Méthodes Informatiques Appliquées à la Gestion des Entreprises. Formation d\'excellence alliant informatique de pointe et gestion managériale.'
    },
    {
      type: 'edu',
      title: 'Baccalauréat D',
      subtitle: 'Institut Froebel',
      date: '2021',
      description: 'Baccalauréat Scientifique (Série D). Obtention du diplôme avec une solide base en mathématiques et sciences de la vie.'
    }
  ];
  
  defaultExperience.forEach(exp => {
    insertExperience.run(exp.type, exp.title, exp.subtitle, exp.date, exp.description);
  });
}

export default db;
