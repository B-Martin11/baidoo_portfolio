import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronRight, X } from 'lucide-react';

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string;
  link: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects = [] }) => {
  const theme = 'dark';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    window.dispatchEvent(new CustomEvent('project-modal-change', { 
      detail: { isOpen: true, projectName: project.name } 
    }));
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    window.dispatchEvent(new CustomEvent('project-modal-change', { 
      detail: { isOpen: false } 
    }));
  };

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Mes <span className="text-gradient">Projets</span>
        </motion.h2>
        <div className="h-1 w-20 bg-bright-orange rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night to-transparent opacity-60" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.split(',').map(tag => (
                  <span key={tag} className="px-2 py-1 bg-accent-blue/10 text-accent-blue rounded text-[10px] font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{project.name}</h3>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-sm mb-6 line-clamp-2`}>
                {project.description}
              </p>
              <button className="flex items-center text-bright-orange font-semibold text-sm group-hover:gap-2 transition-all">
                Voir plus <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-night/80 backdrop-blur-xl"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    className="w-full aspect-video object-cover rounded-2xl mb-6 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex gap-4">
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-bright-orange hover:bg-bright-orange/90 text-white rounded-xl transition-colors font-medium"
                    >
                      <ExternalLink className="w-5 h-5" /> Démo en direct
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-gradient">{selectedProject.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.split(',').map(t => (
                        <span key={t} className="text-xs font-medium text-slate-400">#{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-1">Description</h4>
                      <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm leading-relaxed`}>{selectedProject.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
