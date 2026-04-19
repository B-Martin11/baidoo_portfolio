import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  Code2, 
  Briefcase, 
  FileText,
  Lock,
  Download,
  Award,
  LogOut,
  User,
  Settings,
  Bell,
  Search,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
  Globe
} from 'lucide-react';

interface AdminPageProps {
  onLogout: () => void;
  data: any;
  onUpdate: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onLogout, data, onUpdate }) => {
  const theme = 'dark';
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skills' | 'projects' | 'certificates' | 'cv' | 'settings'>('dashboard');
  const [stats, setStats] = useState(data.stats);
  const [skills, setSkills] = useState(data.skills);
  const [projects, setProjects] = useState(data.projects);
  const [certificates, setCertificates] = useState(data.certificates || []);
  const [cvUrl, setCvUrl] = useState(data.cvUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleLogout = () => {
    onLogout();
  };
  
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: "",
    tags: "React,Node.js",
    link: "#"
  });

  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    date: "",
    description: "",
    image: "",
    link: "#"
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveStats = async () => {
    setIsSaving(true);
    await fetch('/api/update-stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stats })
    });
    setIsSaving(false);
    onUpdate();
  };

  const handleSaveSkills = async () => {
    setIsSaving(true);
    await fetch('/api/update-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills })
    });
    setIsSaving(false);
    onUpdate();
  };

  const handleConfirmAddProject = async () => {
    if (!newProject.name || !newProject.description) {
      alert("Veuillez remplir le nom et la description.");
      return;
    }
    setIsSaving(true);
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'add', 
        project: {
          ...newProject,
          image: newProject.image || "https://picsum.photos/seed/project/800/600"
        } 
      })
    });
    setIsSaving(false);
    setIsAddProjectModalOpen(false);
    setNewProject({ name: "", description: "", image: "", tags: "React,Node.js", link: "#" });
    onUpdate();
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) return;
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', project: { id } })
    });
    onUpdate();
  };

  const handleConfirmAddCert = async () => {
    if (!newCert.name || !newCert.issuer) {
      alert("Veuillez remplir le nom et l'émetteur.");
      return;
    }
    setIsSaving(true);
    await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'add', 
        certificate: {
          ...newCert,
          image: newCert.image || "https://picsum.photos/seed/cert/800/600"
        } 
      })
    });
    setIsSaving(false);
    setIsAddCertModalOpen(false);
    setNewCert({ name: "", issuer: "", date: "", description: "", image: "", link: "#" });
    onUpdate();
  };

  const handleDeleteCert = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce certificat ? Cette action est irréversible.")) return;
    await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', certificate: { id } })
    });
    onUpdate();
  };

  const handleSaveCV = async () => {
    setIsSaving(true);
    await fetch('/api/update-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvUrl })
    });
    setIsSaving(false);
    onUpdate();
  };

  const simulateFileUpload = (type: 'image' | 'cv' | 'cert') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'cv' ? 'application/pdf' : 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (type === 'image') {
          setNewProject(prev => ({ ...prev, image: `https://picsum.photos/seed/${file.name}/800/600` }));
        } else if (type === 'cert') {
          setNewCert(prev => ({ ...prev, image: `https://picsum.photos/seed/${file.name}/800/600` }));
        } else {
          setCvUrl(`https://example.com/uploads/${file.name}`);
          alert("CV 'téléversé' avec succès (simulation).");
        }
      }
    };
    input.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[200] ${theme === 'dark' ? 'bg-[#050505]' : 'bg-slate-100'} flex items-center justify-center p-0 md:p-4 lg:p-8 transition-colors duration-500`}
    >
      <div className={`w-full h-full max-w-[1600px] ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200/60 shadow-2xl shadow-slate-300/50'} md:rounded-[40px] flex flex-col md:flex-row overflow-hidden border relative transition-colors duration-500`}>
        {/* Left Sidebar - Premium Glass */}
        <div className={`w-full md:w-64 border-r ${theme === 'dark' ? 'bg-[#0D0D0D] border-white/5' : 'bg-slate-50/80 border-slate-200/60 backdrop-blur-xl'} flex flex-col h-auto md:h-full z-20 overflow-hidden transition-colors duration-500`}>
          {/* Brand Section */}
          <div className={`p-4 md:p-8 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-bright-orange to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-bright-orange/20 rotate-3 group-hover:rotate-0 transition-transform">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-lg md:text-xl tracking-tighter`}>CORE_OS</h1>
                <p className="text-[8px] md:text-[10px] text-bright-orange font-black uppercase tracking-[0.2em]">Admin v2.4</p>
              </div>
            </div>
          </div>

          {/* User Profile Mini */}
          <div className={`hidden md:flex p-4 mx-3 my-3 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200/60 shadow-sm'} border rounded-2xl items-center gap-3`}>
            <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'} flex items-center justify-center border`}>
              <User className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} truncate`}>BAIDOO MARTIN</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[8px] text-slate-500 font-bold uppercase">Root Access</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-row md:flex-col px-3 py-2 space-x-1 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-y-auto no-scrollbar flex">
            <p className={`hidden md:block px-3 py-2 text-[8px] font-black ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'} uppercase tracking-[0.2em]`}>Main Menu</p>
            {[
              { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Tableau de bord' },
              { id: 'skills', icon: <Code2 className="w-4 h-4" />, label: 'Compétences' },
              { id: 'projects', icon: <Briefcase className="w-4 h-4" />, label: 'Projets' },
              { id: 'certificates', icon: <Award className="w-4 h-4" />, label: 'Certifications' },
              { id: 'cv', icon: <FileText className="w-4 h-4" />, label: 'Documents' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-bright-orange to-orange-600 text-white shadow-lg shadow-bright-orange/30' 
                    : `${theme === 'dark' ? 'text-slate-500 hover:bg-white/5 hover:text-white' : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm hover:border-slate-200/60'}`
                }`}
              >
                <div className={`${activeTab === item.id ? 'text-white' : `${theme === 'dark' ? 'text-slate-600 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`} transition-colors`}>
                  {item.icon}
                </div>
                <span className="font-black text-[10px] md:text-xs tracking-tight whitespace-nowrap">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div layoutId="activeTab" className="ml-auto w-1 h-1 bg-white rounded-full hidden md:block" />
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className={`hidden md:block p-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'} space-y-2`}>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full p-3 rounded-xl transition-all flex items-center gap-3 group ${
                activeTab === 'settings' 
                  ? 'bg-bright-orange text-white shadow-lg shadow-bright-orange/30' 
                  : `${theme === 'dark' ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'}`
              }`}
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span className="font-bold text-xs">Paramètres</span>
            </button>
          </div>

          {/* Mobile Logout removed */}
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-w-0 ${theme === 'dark' ? 'bg-[#080808]' : 'bg-white'} transition-colors duration-500`}>
          {/* Top Bar */}
          <header className={`h-16 md:h-24 border-b ${theme === 'dark' ? 'border-white/5 bg-[#080808]/80' : 'border-slate-100 bg-white/80'} px-4 md:px-12 flex items-center justify-between gap-4 md:gap-8 z-10 backdrop-blur-md transition-colors duration-500`}>
            <div className="flex-1 max-w-xl relative hidden md:block">
              {/* Search bar removed as per user request */}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              <div className={`flex items-center gap-3 px-4 py-2 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/60'} rounded-xl border`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className={`text-[10px] font-black ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest`}>Système en ligne</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'} flex items-center justify-center transition-all border ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto">
              
              {activeTab === 'dashboard' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-bright-orange">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vue d'ensemble du système</span>
                      </div>
                      <h2 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter`}>TABLEAU DE BORD</h2>
                    </div>
                    <button 
                      onClick={handleSaveStats}
                      disabled={isSaving}
                      className={`px-6 py-3 ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'} rounded-xl font-black flex items-center gap-3 hover:bg-bright-orange hover:text-white transition-all disabled:opacity-50 shadow-xl text-sm`}
                    >
                      <Save className="w-4 h-4" /> {isSaving ? 'SYNCHRONISATION...' : 'ENREGISTRER'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.map((stat: any, i: number) => (
                      <div key={stat.label} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-bright-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px] -z-10" />
                        <div className={`${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'} border p-6 rounded-[24px] space-y-6 hover:border-bright-orange/30 transition-all`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} rounded-xl flex items-center justify-center text-bright-orange`}>
                                <Activity className="w-5 h-5" />
                              </div>
                              <h3 className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-base tracking-tight`}>{stat.label}</h3>
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{stat.trend}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-3">
                              <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Valeur Actuelle</label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  value={stat.value}
                                  onChange={(e) => {
                                    const newStats = [...stats];
                                    newStats[i].value = e.target.value;
                                    setStats(newStats);
                                  }}
                                  className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-2xl p-5 font-mono text-xl focus:outline-none focus:border-bright-orange transition-colors`}
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-xs">ID_VAL</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-accent-blue">
                        <Code2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Arsenal Technique</span>
                      </div>
                      <h2 className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter`}>COMPÉTENCES</h2>
                    </div>
                    <button 
                      onClick={handleSaveSkills}
                      disabled={isSaving}
                      className="px-8 py-4 bg-accent-blue text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent-blue/20"
                    >
                      <Save className="w-5 h-5" /> METTRE À JOUR
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {skills.map((skill: any, i: number) => (
                      <div key={skill.category} className={`${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'} border p-10 rounded-[40px] relative overflow-hidden group`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 blur-[100px] -z-10" />
                        
                        <div className="flex items-center gap-4 mb-10">
                          <div className={`w-14 h-14 ${theme === 'dark' ? 'bg-accent-blue/10 border-accent-blue/20' : 'bg-accent-blue/5 border-accent-blue/10'} rounded-2xl flex items-center justify-center text-accent-blue border`}>
                            <Layers className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight uppercase`}>{skill.category}</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{skill.items.length} Technologies Actives</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                          <AnimatePresence>
                            {skill.items.map((item: string, j: number) => (
                              <motion.div 
                                key={item} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={`flex items-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'} px-6 py-3 rounded-2xl border group/item hover:border-red-500/50 hover:bg-red-500/5 transition-all`}
                              >
                                <span className={`text-sm font-black transition-colors group-hover/item:text-red-500`}>{item}</span>
                                <button 
                                  onClick={() => {
                                    const newSkills = [...skills];
                                    newSkills[i].items = newSkills[i].items.filter((_: any, idx: number) => idx !== j);
                                    setSkills(newSkills);
                                  }}
                                  className="text-slate-600 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Ajouter une nouvelle technologie... (Entrée)"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                if (target.value) {
                                  const newSkills = skills.map((s: any, idx: number) => {
                                    if (idx === i) {
                                      if (!s.items.includes(target.value)) {
                                        return { ...s, items: [...s.items, target.value] };
                                      }
                                    }
                                    return s;
                                  });
                                  setSkills(newSkills);
                                  target.value = '';
                                }
                              }
                            }}
                            className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} border rounded-[24px] p-6 font-bold focus:outline-none focus:border-accent-blue transition-all`}
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-600">
                            <span className="text-[10px] font-black uppercase tracking-widest">Appuyez sur</span>
                            <div className={`px-2 py-1 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-200 border-slate-300'} border rounded text-[10px] font-mono`}>ENTRÉE</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-bright-orange">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vitrine de Travail</span>
                      </div>
                      <h2 className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter`}>PROJETS</h2>
                    </div>
                    <button 
                      onClick={() => setIsAddProjectModalOpen(true)}
                      className="px-8 py-4 bg-bright-orange text-white rounded-2xl font-black flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-2xl shadow-bright-orange/20"
                    >
                      <PlusCircle className="w-5 h-5" /> NOUVEAU PROJET
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {projects.map((project: any) => (
                      <motion.div 
                        key={project.id} 
                        layout
                        className={`${theme === 'dark' ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm'} border p-8 rounded-[40px] flex flex-col lg:flex-row items-center gap-10 hover:border-bright-orange/30 transition-all group relative overflow-hidden`}
                      >
                        <div className={`w-full lg:w-64 aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                          <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt="" />
                        </div>
                        
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                          <div className="space-y-3">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                              <span className="text-[10px] font-black text-bright-orange uppercase tracking-[0.3em]">Project_ID: {project.id}</span>
                            </div>
                            <h3 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter group-hover:text-bright-orange transition-colors`}>{project.name}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl text-sm">{project.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {project.tags?.split(',').map((tag: string) => (
                              <span key={tag} className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5' : 'bg-slate-100 text-slate-600 border-slate-200'} rounded-full border`}>{tag.trim()}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex-1 lg:w-16 lg:h-16 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center justify-center text-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg"
                            title="TERMINATE PROJECT"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-500">
                        <Award className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Titres Vérifiés</span>
                      </div>
                      <h2 className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter`}>CERTIFICATIONS</h2>
                    </div>
                    <button 
                      onClick={() => setIsAddCertModalOpen(true)}
                      className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-black flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-2xl shadow-purple-600/20"
                    >
                      <PlusCircle className="w-5 h-5" /> AJOUTER UN TITRE
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {certificates.map((cert: any) => (
                      <motion.div 
                        key={cert.id} 
                        layout
                        className={`${theme === 'dark' ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm'} border p-8 rounded-[40px] flex flex-col lg:flex-row items-center gap-10 hover:border-purple-500/30 transition-all group relative overflow-hidden`}
                      >
                        <div className={`w-full lg:w-64 aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                          <img src={cert.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt="" />
                        </div>
                        
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                          <div className="space-y-4">
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                              <div className="px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
                                <span className="text-[9px] font-black text-purple-500 uppercase tracking-[0.2em]">{cert.issuer}</span>
                              </div>
                              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{cert.date}</span>
                            </div>
                            <h3 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter group-hover:text-purple-500 transition-colors`}>{cert.name}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl text-sm">{cert.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                          <button 
                            onClick={() => handleDeleteCert(cert.id)}
                            className="flex-1 lg:w-16 lg:h-16 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center justify-center text-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg"
                            title="REVOKE CREDENTIAL"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cv' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-bright-orange">
                        <FileText className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Document de Carrière</span>
                      </div>
                      <h2 className={`text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tighter`}>CURRICULUM</h2>
                    </div>
                    <button 
                      onClick={handleSaveCV}
                      disabled={isSaving}
                      className="px-8 py-4 bg-bright-orange text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-50 shadow-xl shadow-bright-orange/20"
                    >
                      <Save className="w-5 h-5" /> SYNCHRONISER
                    </button>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-200 shadow-sm'} border p-12 rounded-[48px] space-y-12 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-bright-orange/5 blur-[120px] -z-10" />
                    
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-bright-orange/10 border-bright-orange/20' : 'bg-bright-orange/5 border-bright-orange/10'} rounded-xl flex items-center justify-center text-bright-orange border`}>
                          <PlusCircle className="w-5 h-5" />
                        </div>
                        <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight uppercase`}>Téléverser une nouvelle version</h3>
                      </div>
                      
                      <div 
                        onClick={() => simulateFileUpload('cv')}
                        className={`w-full border-2 border-dashed ${theme === 'dark' ? 'border-white/5 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'} rounded-[40px] p-24 flex flex-col items-center justify-center gap-8 cursor-pointer hover:border-bright-orange/50 transition-all group`}
                      >
                        <div className={`w-28 h-28 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} rounded-[32px] flex items-center justify-center group-hover:scale-110 group-hover:bg-bright-orange/10 transition-all duration-500 border`}>
                          <FileText className="w-12 h-12 text-slate-500 group-hover:text-bright-orange" />
                        </div>
                        <div className="text-center space-y-3">
                          <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>Déposez votre PDF ici</p>
                          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Taille max : 10Mo • PDF Uniquement</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-accent-blue/10 border-accent-blue/20' : 'bg-accent-blue/5 border-accent-blue/10'} rounded-xl flex items-center justify-center text-accent-blue border`}>
                          <Globe className="w-5 h-5" />
                        </div>
                        <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight uppercase`}>Lien de stockage cloud</h3>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            value={cvUrl}
                            onChange={(e) => setCvUrl(e.target.value)}
                            placeholder="https://storage.google.com/martin-cv-2024.pdf"
                            className={`w-full ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-[24px] p-6 font-mono text-sm focus:outline-none focus:border-bright-orange transition-all`}
                          />
                        </div>
                        {cvUrl && (
                          <a 
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-20 h-20 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} rounded-[24px] flex items-center justify-center text-slate-400 hover:text-white hover:bg-bright-orange transition-all`}
                            title="Preview Current CV"
                          >
                            <Download className="w-7 h-7" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-bright-orange">
                        <Settings className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Configuration du système</span>
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tighter">PARAMÈTRES</h2>
                    </div>
                  </div>

                  <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-[40px] space-y-8 shadow-xl">
                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-white tracking-tight uppercase">Apparence</h3>
                      <div className="p-6 rounded-3xl border-2 border-bright-orange bg-white/5 shadow-lg shadow-bright-orange/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-bright-orange/20 text-bright-orange">
                            <Lock className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-black text-white text-sm">Mode Sombre</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Interface par défaut (Activé)</p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-bright-orange" />
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                      <AlertCircle className="w-5 h-5 text-bright-orange" />
                      <p className="text-xs font-medium text-slate-400">
                        Le mode sombre est l'interface standard optimisée pour le confort visuel.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

        {/* Add Project Modal */}
        <AnimatePresence>
          {isAddProjectModalOpen && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddProjectModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0D0D0D] border-white/10 rounded-3xl md:rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[95vh] flex flex-col"
              >
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">NOUVEAU_PROJET</h3>
                      <p className="text-[10px] text-bright-orange font-black uppercase tracking-[0.2em]">Séquence de déploiement</p>
                    </div>
                    <button onClick={() => setIsAddProjectModalOpen(false)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 text-slate-500 hover:text-white flex items-center justify-center transition-colors">
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identifiant du Projet</label>
                      <input 
                        type="text" 
                        placeholder="ex: Dashboard Quantique"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-bright-orange transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Brief de Mission</label>
                      <textarea 
                        placeholder="Décrivez les fonctionnalités principales..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 h-32 resize-none focus:outline-none focus:border-bright-orange transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL de l'image ou Téléversement</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="https://images..."
                            value={newProject.image}
                            onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                            className="flex-1 bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-bright-orange transition-all"
                          />
                          <label className="w-16 h-16 bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all border">
                            <Plus className="w-6 h-6" />
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, (url) => setNewProject(prev => ({...prev, image: url})))} 
                            />
                          </label>
                        </div>
                        {newProject.image && (
                          <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                            <img src={newProject.image} className="w-full h-full object-cover" alt="Preview" />
                            <button 
                              onClick={() => setNewProject(prev => ({...prev, image: ""}))}
                              className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tags Techniques</label>
                        <input 
                          type="text" 
                          placeholder="React, Node, D3"
                          value={newProject.tags}
                          onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                          className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-bright-orange transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5 mt-8">
                    <button 
                      onClick={() => setIsAddProjectModalOpen(false)}
                      className="flex-1 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white/5 text-slate-500 hover:bg-white/5 hover:text-white font-black transition-all text-sm"
                    >
                      ANNULER
                    </button>
                    <button 
                      onClick={handleConfirmAddProject}
                      className="flex-[2] py-4 md:py-5 bg-bright-orange text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-bright-orange/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                    >
                      INITIALISER LE DÉPLOIEMENT
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Add Certificate Modal */}
        <AnimatePresence>
          {isAddCertModalOpen && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddCertModalOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0D0D0D] border-white/10 rounded-3xl md:rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[95vh] flex flex-col"
              >
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">NOUVELLE_CERTIFICATION</h3>
                      <p className="text-[10px] text-purple-500 font-black uppercase tracking-[0.2em]">Séquence de validation</p>
                    </div>
                    <button onClick={() => setIsAddCertModalOpen(false)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 text-slate-500 hover:text-white flex items-center justify-center transition-colors">
                      <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nom du Certificat</label>
                      <input 
                        type="text" 
                        placeholder="ex: AWS Solutions Architect"
                        value={newCert.name}
                        onChange={(e) => setNewCert({...newCert, name: e.target.value})}
                        className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Organisme Émetteur</label>
                        <input 
                          type="text" 
                          placeholder="Google, Microsoft, etc."
                          value={newCert.issuer}
                          onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                          className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date d'Obtention</label>
                        <input 
                          type="text" 
                          placeholder="Jan 2024"
                          value={newCert.date}
                          onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                          className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL de l'image ou Téléversement</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={newCert.image}
                          onChange={(e) => setNewCert({...newCert, image: e.target.value})}
                          className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 focus:outline-none focus:border-purple-500 transition-all"
                        />
                        <label className="w-16 h-16 bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all border">
                          <Plus className="w-6 h-6" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (url) => setNewCert(prev => ({...prev, image: url})))} 
                          />
                        </label>
                      </div>
                      {newCert.image && (
                        <div className="mt-2 relative w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                          <img src={newCert.image} className="w-full h-full object-cover" alt="Preview" />
                          <button 
                            onClick={() => setNewCert(prev => ({...prev, image: ""}))}
                            className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                      <textarea 
                        placeholder="Expliquez brièvement la portée de la certification..."
                        value={newCert.description}
                        onChange={(e) => setNewCert({...newCert, description: e.target.value})}
                        className="w-full bg-white/5 border-white/10 text-white rounded-2xl p-5 h-24 resize-none focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5 mt-8">
                    <button 
                      onClick={() => setIsAddCertModalOpen(false)}
                      className="flex-1 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white/5 text-slate-500 hover:bg-white/5 hover:text-white font-black transition-all text-sm"
                    >
                      ANNULER
                    </button>
                    <button 
                      onClick={handleConfirmAddCert}
                      className="flex-[2] py-4 md:py-5 bg-purple-600 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-purple-600/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
                    >
                      VALIDER LE TITRE
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </motion.div>
  );
};
