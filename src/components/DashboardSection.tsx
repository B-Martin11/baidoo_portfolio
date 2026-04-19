import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Code, 
  Cpu, 
  TrendingUp, 
  Activity,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface Stat {
  label: string;
  value: string;
  trend: string;
  icon_type: string;
}

interface ChartData {
  name: string;
  code: number;
  projects: number;
}

interface TechData {
  subject: string;
  value: number;
  fullMark: number;
}

interface DashboardSectionProps {
  stats?: Stat[];
  chartData?: ChartData[];
  techData?: TechData[];
}

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'briefcase': return <Briefcase className="text-accent-blue" />;
    case 'code': return <Code className="text-purple-400" />;
    case 'cpu': return <Cpu className="text-bright-orange" />;
    case 'activity': return <Activity className="text-emerald-400" />;
    default: return <Activity className="text-slate-400" />;
  }
};

export const DashboardSection: React.FC<DashboardSectionProps> = ({ stats = [], chartData = [], techData = [] }) => {
  const theme = 'dark';
  return (
    <section id="dashboard" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          📊 Mon <span className="text-gradient">Dashboard</span>
        </motion.h2>
        <div className="h-1 w-20 bg-bright-orange rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} p-3 rounded-2xl`}>{getIcon(stat.icon_type)}</div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-wider">
                {stat.trend}
              </span>
            </div>
            <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>{stat.value}</p>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-[32px] min-h-[400px]"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
              <TrendingUp className="w-5 h-5 text-accent-blue" /> Progression Annuelle
            </h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-blue" />
              <span className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#ffffff10" : "#00000010"} vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                    border: theme === 'dark' ? '1px solid #ffffff10' : '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#0f172a'
                  }}
                  itemStyle={{ color: theme === 'dark' ? '#fff' : '#0f172a' }}
                />
                <Area type="monotone" dataKey="code" stroke="#38bdf8" fillOpacity={1} fill="url(#colorCode)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
