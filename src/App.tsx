/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { FoxMascot } from './components/FoxMascot';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { DashboardSection } from './components/DashboardSection';
import { MethodologySection } from './components/MethodologySection';
import { CertificatesSection } from './components/CertificatesSection';
import { AdminPage } from './components/AdminPage';
import { ChevronDown, Sparkles, Lock, Download, Linkedin, Github, Globe, Award, LogOut } from 'lucide-react';

export default function App() {
  const [mascotMessage, setMascotMessage] = useState("Bienvenue sur mon portfolio ! Je suis BAIDOO MARTIN KOFI MEDES.");
  const [mascotType, setMascotType] = useState<'default' | 'data' | 'dev' | 'project' | 'secret'>('default');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const theme = 'dark';
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fetchData = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setPortfolioData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.success) {
      setIsAuthModalOpen(false);
      setPassword(""); // Clear password
      setShowWelcome(true);
      setMascotType('secret');
      setMascotMessage("Martin_Sandiego_Dev");
      
      setTimeout(() => {
        setShowWelcome(false);
        setIsAdminOpen(true);
      }, 1500);
    } else {
      alert("Error: Vous n'êtes pas administrateur");
      setPassword(""); // Clear password on error too
    }
  };

  // Listen for custom event from ProjectsSection
  useEffect(() => {
    const handleModalChange = (e: any) => {
      setIsProjectModalOpen(e.detail.isOpen);
      if (e.detail.isOpen) {
        setMascotMessage(`Voici le projet ${e.detail.projectName}. Impressionnant, non ?`);
        setMascotType('project');
      } else {
        setMascotType('default');
      }
    };
    window.addEventListener('project-modal-change', handleModalChange);
    return () => window.removeEventListener('project-modal-change', handleModalChange);
  }, []);

  // Section observer
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isProjectModalOpen && !isAdminOpen) {
          switch (entry.target.id) {
            case 'hero':
              setMascotMessage("Salut ! Je suis ton guide. Prêt à explorer le parcours de Martin ?");
              setMascotType('default');
              break;
            case 'about':
              setMascotMessage("Ici, Martin explique sa vision du design et du développement Front-End.");
              setMascotType('default');
              break;
            case 'dashboard':
              setMascotMessage("Regarde ces statistiques ! Elles montrent l'impact de mes solutions.");
              setMascotType('data');
              break;
            case 'skills':
              setMascotMessage("Voici mon arsenal technique, optimisé pour la performance.");
              setMascotType('dev');
              break;
            case 'methodology':
              setMascotMessage("La rigueur et la méthode sont les clés de mes projets réussis.");
              setMascotType('project');
              break;
            case 'projects':
              setMascotMessage(`Découvre mes 5+ projets majeurs, comme UPB Student's ou Metro.`);
              setMascotType('project');
              break;
            case 'certificates':
              const certCount = portfolioData?.certificates?.length || 0;
              setMascotMessage(`Mes certifications attestent de mon engagement envers la qualité.`);
              setMascotType('secret');
              break;
            case 'experience':
              setMascotMessage("Mon parcours m'a permis de forger une expertise solide et polyvalente.");
              setMascotType('default');
              break;
            case 'contact':
              setMascotMessage("Besoin d'une solution digitale ? Parlons de votre projet !");
              setMascotType('default');
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isProjectModalOpen, isAdminOpen]);

  const handleLogout = () => {
    setShowGoodbye(true);
    setMascotType('default');
    setMascotMessage("À bientôt Martin ! Système en cours de fermeture.");
    
    setTimeout(() => {
      setShowGoodbye(false);
      setIsAdminOpen(false);
      setIsAuthModalOpen(false);
      setPassword("");
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAuthModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!portfolioData) return <div className="min-h-screen bg-night flex items-center justify-center text-white font-bold">Chargement de l'univers...</div>;

  return (
    <div className="relative min-h-screen transition-colors duration-500 dark bg-[#050505] text-white selection:bg-accent-blue selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-purple-500 to-bright-orange z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full hidden md:flex items-center gap-8 border-white/10 shadow-2xl"
      >
        {['À propos', 'Dashboard', 'Compétences', 'Méthode', 'Projets', 'Certificats', 'Expériences', 'Contact'].map((item, i) => (
          <a 
            key={item}
            href={`#${['about', 'dashboard', 'skills', 'methodology', 'projects', 'certificates', 'experience', 'contact'][i]}`}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bright-orange transition-all group-hover:w-full" />
          </a>
        ))}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-24 relative overflow-hidden pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue/10 rounded-md border border-accent-blue/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue">BAIDOO MARTIN KOFI MEDES</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                SALUT ! JE SUIS <span className="text-gradient">MARTIN</span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-accent-blue flex items-center gap-2">
                Developer Full-stack & Data analyste  <span className="w-1 h-10 bg-accent-blue animate-pulse" />
              </h2>
            </div>
            
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              Je conçois et développe des solutions digitales performantes en combinant ingénierie logicielle et analyse de données. Je transforme des problématiques complexes en applications robustes, intelligentes et sécurisées, avec un fort accent sur la qualité du code, la scalabilité et la valorisation des données pour la prise de décision.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              {portfolioData.cvUrl && (
                <a 
                  href={portfolioData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-bright-orange hover:bg-bright-orange/90 text-white rounded-full font-black transition-all flex items-center gap-3 group shadow-xl shadow-bright-orange/20"
                >
                  <Download className="w-5 h-5 group-hover:bounce" /> TÉLÉCHARGER CV
                </a>
              )}
              
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-accent-blue transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-500 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-bright-orange transition-all">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-10 border border-white/5 rounded-full animate-[spin_25s_linear_infinite]" />
              
             <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white/5 shadow-2xl">
  <img 
    src="/images/pic1.jpeg"
    alt="BAIDOO MARTIN KOFI MEDES"
    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
  />
</div>

              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 left-10 w-12 h-12 bg-accent-blue rounded-full blur-xl opacity-40" 
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 -right-10 w-16 h-16 bg-purple-500 rounded-full blur-xl opacity-30" 
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-blue/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />
        </div>
      </section>

      {/* About Section - Redesigned to match image */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] glass rounded-[40px] overflow-hidden relative group border-white/10 shadow-2xl">
              <img 
                src="/Images/pic5.png"
               alt="BAIDOO MARTIN KOFI MEDES"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
            </div>
            {/* Decorative element behind image */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-white/5 rounded-full -z-10" />
            <div className="absolute -top-10 -right-10 w-48 h-48 border border-white/5 rounded-full -z-10" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 border border-accent-blue/20 rounded-full -z-10 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue/10 rounded-md border border-accent-blue/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue">À PROPOS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
              JE CONSTRUIS DES SOLUTIONS DIGITALES INTELLIGENTES <br /><span className="text-accent-blue"> FULL STACK • DATA • IA</span>
            </h2>
            
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
               Développeur Full Stack et co-fondateur de Gama Labs, je conçois des applications web performantes, évolutives et centrées sur les besoins réels.
              </p>
              <p>
                J’interviens également en freelance sur différents projets, où j’accompagne entreprises et particuliers dans le développement de solutions sur mesure, alliant développement web, analyse de données et automatisation.
              </p>
              <p>
                Passionné par la data, j’utilise des outils comme Excel, SQL et Python pour exploiter les données et améliorer la prise de décision.
              </p>
              <p>
                À travers mes projets et Gama Labs, j’intègre des solutions d’intelligence artificielle afin d’optimiser les processus et créer des systèmes intelligents et efficaces.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="glass p-6 rounded-2xl border-white/5 hover:border-purple-500/30 transition-all max-w-xs">
                <p className="text-3xl font-black text-white">3+</p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Années d'Expérience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <DashboardSection stats={portfolioData.stats} chartData={portfolioData.chartData} techData={portfolioData.techDistribution} />
      <SkillsSection skills={portfolioData.skills} />
      <MethodologySection />
      <ProjectsSection projects={portfolioData.projects} />
      <CertificatesSection certificates={portfolioData.certificates} />
      <ExperienceSection experience={portfolioData.experience} />
      <ContactSection cvUrl={portfolioData.cvUrl} />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-[#0a0a0a] text-center relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BAIDOO MARTIN KOFI MEDES • Excellence en MIAGE
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-slate-400 hover:text-bright-orange hover:border-bright-orange/50 border-white/5 transition-all group border"
            >
              <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Administration</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-night/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass p-8 rounded-3xl max-w-md w-full border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="text-bright-orange" /> Accès Admin
              </h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-bright-orange"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAuthModalOpen(false);
                      setPassword("");
                    }}
                    className="flex-1 py-3 glass rounded-xl font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-bright-orange text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Entrer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Animation Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Cinematic Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-bright-orange/10 via-transparent to-accent-blue/10 blur-[100px]"
              />
              {/* Scanning Line Effect */}
              <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-bright-orange/30 shadow-[0_0_20px_rgba(249,115,22,0.5)] z-20"
              />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-12 z-10"
            >
              <div className="relative">
                <motion.div 
                  animate={{ 
                    rotateY: [0, 360],
                    boxShadow: [
                      "0 0 20px rgba(249,115,22,0.2)",
                      "0 0 60px rgba(249,115,22,0.5)",
                      "0 0 20px rgba(249,115,22,0.2)"
                    ]
                  }}
                  transition={{ 
                    rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                  className="w-32 h-32 bg-night border-2 border-bright-orange rounded-3xl mx-auto flex items-center justify-center relative z-20"
                >
                  <Lock className="w-12 h-12 text-bright-orange" />
                </motion.div>
                <div className="absolute inset-0 bg-bright-orange/20 blur-[40px] rounded-full -z-10" />
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1 bg-bright-orange/10 rounded-full border border-bright-orange/20"
                >
                  <Sparkles className="w-3 h-3 text-bright-orange" />
                  <span className="text-[9px] font-black text-bright-orange uppercase tracking-[0.4em]">Accès Autorisé</span>
                </motion.div>
                
                <div className="space-y-1">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
                  >
                    BIENVENUE
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-bright-orange font-mono font-black tracking-[0.5em] text-xl"
                  >
                    MARTIN_ROOT
                  </motion.p>
                </div>
              </div>

              <div className="relative w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-bright-orange shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                />
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-slate-500 font-black text-[9px] uppercase tracking-[0.6em] animate-pulse"
              >
                Initialisation du système...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Page */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPage 
            onLogout={handleLogout} 
            data={portfolioData}
            onUpdate={fetchData}
          />
        )}
      </AnimatePresence>

      {/* Goodbye Animation Overlay */}
      <AnimatePresence>
        {showGoodbye && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-bl from-red-600/10 via-transparent to-purple-600/10 blur-[100px]"
              />
            </div>

            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center space-y-8 z-10"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-full mx-auto flex items-center justify-center"
              >
                <LogOut className="w-10 h-10 text-red-500" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">À BIENTÔT</h2>
                <p className="text-red-500 font-mono font-black tracking-[0.5em] text-xl">MARTIN</p>
              </div>

              <p className="text-slate-500 font-black text-[9px] uppercase tracking-[0.4em]">Déconnexion sécurisée en cours...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <FoxMascot message={mascotMessage} isProjectModalOpen={isProjectModalOpen || isAdminOpen} type={mascotType} />
    </div>
  );
}
