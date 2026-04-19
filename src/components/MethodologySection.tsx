import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  PenTool, 
  Terminal, 
  TestTube, 
  Rocket,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    title: "Analyse du besoin",
    description: "Compréhension profonde des enjeux métier et définition des spécifications.",
    icon: <Search className="w-6 h-6" />,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10"
  },
  {
    title: "Conception",
    description: "Architecture logicielle, modélisation de données et design UX/UI.",
    icon: <PenTool className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Implémentation",
    description: "Développement agile avec un code propre, documenté et performant.",
    icon: <Terminal className="w-6 h-6" />,
    color: "text-bright-orange",
    bg: "bg-bright-orange/10"
  },
  {
    title: "Tests",
    description: "Validation rigoureuse : tests unitaires, d'intégration et sécurité.",
    icon: <TestTube className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Déploiement",
    description: "Mise en production, monitoring et amélioration continue.",
    icon: <Rocket className="w-6 h-6" />,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  }
];

export const MethodologySection = () => {
  const theme = 'dark';
  return (
    <section id="methodology" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          🧩 Ma <span className="text-gradient">Méthodologie</span>
        </motion.h2>
        <div className="h-1 w-20 bg-bright-orange rounded-full" />
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="glass-card p-6 rounded-3xl h-full flex flex-col items-center text-center transition-all">
                <div className={`p-4 ${step.bg} ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-3`}>{step.title}</h3>
                <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'} text-sm leading-relaxed`}>{step.description}</p>
                
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-slate-700 group-hover:text-white transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative background line */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-white/5 -translate-y-1/2" />
      </div>
    </section>
  );
};
