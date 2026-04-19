import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Database, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Terminal,
  Layers,
  Globe,
  Zap,
  Smartphone,
  Workflow
} from 'lucide-react';

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsSectionProps {
  skills?: SkillCategory[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'développement': return <Code2 className="w-6 h-6 text-accent-blue" />;
    case 'data & bi': return <BarChart3 className="w-6 h-6 text-purple-400" />;
    case 'cybersécurité': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    case 'outils': return <Cpu className="w-6 h-6 text-bright-orange" />;
    default: return <Layers className="w-6 h-6 text-slate-400" />;
  }
};

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('react')) return <Globe className="w-3 h-3" />;
  if (s.includes('python')) return <Terminal className="w-3 h-3" />;
  if (s.includes('sql') || s.includes('database')) return <Database className="w-3 h-3" />;
  if (s.includes('flutter')) return <Smartphone className="w-3 h-3" />;
  if (s.includes('n8n')) return <Workflow className="w-3 h-3" />;
  return <Zap className="w-3 h-3" />;
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills = [] }) => {
  const theme = 'dark';
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Mes <span className="text-gradient">Compétences</span>
        </motion.h2>
        <div className="h-1 w-20 bg-bright-orange rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl group"
          >
            <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} mb-6 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
              {getCategoryIcon(skill.category)}
            </div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map(item => (
                <span key={item} className={`px-3 py-1.5 ${theme === 'dark' ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'} rounded-full text-xs font-medium border flex items-center gap-2 transition-colors`}>
                  {getSkillIcon(item)}
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
