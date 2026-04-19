import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, X, ChevronRight } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  link: string;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const theme = 'dark';
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-md border border-purple-500/20 mb-4"
        >
          <Award className="w-4 h-4 text-purple-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Certifications</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          Mes <span className="text-gradient">Accréditations</span>
        </motion.h2>
        <div className="h-1 w-20 bg-purple-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-white/5 hover:border-purple-500/30 transition-all duration-500"
            onClick={() => setSelectedCert(cert)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent opacity-60" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded text-[10px] font-bold uppercase tracking-wider">
                  {cert.issuer}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {cert.date}
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} group-hover:text-purple-500 transition-colors line-clamp-2`}>
                {cert.name}
              </h3>
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-xs mb-4 line-clamp-2`}>
                {cert.description}
              </p>
              <button className="flex items-center text-purple-500 font-semibold text-sm group-hover:gap-2 transition-all">
                Détails <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 ${theme === 'dark' ? 'bg-night/90' : 'bg-slate-900/40'} backdrop-blur-2xl`}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass max-w-2xl w-full rounded-3xl md:rounded-[40px] p-6 md:p-10 relative border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.2)] max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-white/5">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                        {selectedCert.issuer}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {selectedCert.date}
                      </span>
                    </div>
                    <h3 className={`text-3xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter leading-none`}>
                      {selectedCert.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em]">L'HISTOIRE DU CERTIFICAT</h4>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-base leading-relaxed font-medium`}>
                      {selectedCert.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a 
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-all font-black shadow-2xl shadow-purple-600/30 group w-full md:w-auto"
                    >
                      VÉRIFIER LE CERTIFICAT <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
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
