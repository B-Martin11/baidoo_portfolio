import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase } from 'lucide-react';

export const ExperienceSection = ({ experience }: { experience?: any[] }) => {
  const theme = 'dark';
  const timeline = experience || [
    {
      type: 'edu',
      title: 'Master MIAGE',
      subtitle: 'Université de Technologie',
      date: '2024 - Présent',
      description: 'Spécialisation en Ingénierie des Données et Cybersécurité.'
    },
    {
      type: 'exp',
      title: 'Développeur Fullstack (Stage)',
      subtitle: 'TechCorp Solutions',
      date: '2023 (6 mois)',
      description: 'Développement d\'une application interne de gestion de stocks sous React et Node.js.'
    },
    {
      type: 'edu',
      title: 'Licence MIAGE',
      subtitle: 'Faculté des Sciences',
      date: '2021 - 2024',
      description: 'Bases solides en gestion d\'entreprise, algorithmique et bases de données.'
    },
    {
      type: 'exp',
      title: 'Assistant IT',
      subtitle: 'Mairie de ma ville',
      date: '2022 (Eté)',
      description: 'Maintenance du parc informatique et support utilisateur.'
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Parcours <span className="text-gradient">& Expériences</span>
        </motion.h2>
        <div className="h-1 w-20 bg-bright-orange rounded-full" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-purple-500 to-bright-orange opacity-30" />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Dot */}
              <div className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${theme === 'dark' ? 'bg-night' : 'bg-white'} border-2 border-bright-orange z-10 hidden md:block`} />
              
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}>
                <div className="glass-card p-6 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    {item.type === 'edu' ? (
                      <GraduationCap className="w-5 h-5 text-accent-blue" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-purple-400" />
                    )}
                    <span className="text-xs font-bold text-bright-orange uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>{item.title}</h3>
                  <p className="text-accent-blue text-sm font-medium mb-3">{item.subtitle}</p>
                  <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
