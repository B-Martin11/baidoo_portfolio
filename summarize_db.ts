import * as fs from 'fs';

const raw = fs.readFileSync('db_content.json', 'utf8');
const data = JSON.parse(raw);

console.log("=== CERTIFICATES ===");
data.certificates.forEach((c: any, index: number) => {
  console.log(`[${index}] Name: ${c.name}, Issuer: ${c.issuer}, Date: ${c.date}`);
  console.log(`    Image Length: ${c.image?.length || 0}`);
  if (c.image && c.image.substring(0, 100)) {
    console.log(`    Image Preview: ${c.image.substring(0, 50)}...`);
  }
});

console.log("\n=== PROJECTS ===");
data.projects.forEach((p: any, index: number) => {
  console.log(`[${index}] Name: ${p.name}, Tags: ${p.tags}`);
  console.log(`    Image Length: ${p.image?.length || 0}`);
});

console.log("\n=== SKILLS ===");
console.log(JSON.stringify(data.skills, null, 2));

console.log("\n=== EXPERIENCE ===");
console.log(JSON.stringify(data.experience, null, 2));
