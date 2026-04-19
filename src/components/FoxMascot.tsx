import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FoxMascotProps {
  message: string;
  isProjectModalOpen?: boolean;
  type?: 'default' | 'data' | 'dev' | 'project' | 'secret';
}

export const FoxMascot: React.FC<FoxMascotProps> = ({ message, isProjectModalOpen, type = 'default' }) => {
  const theme = 'dark';
  const [isBlinking, setIsBlinking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isAutoWalking, setIsAutoWalking] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Walking animation logic
  useEffect(() => {
    if (isProjectModalOpen || !isAutoWalking) return;

    const moveInterval = setInterval(() => {
      setPosition(prev => {
        const nextX = prev.x + (direction * 1.5);
        if (nextX > 120) {
          setDirection(-1);
          return prev;
        }
        if (nextX < -120) {
          setDirection(1);
          return prev;
        }
        return { ...prev, x: nextX };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [direction, isProjectModalOpen, isAutoWalking]);

  return (
    <motion.div 
      drag
      dragConstraints={{ 
        left: -window.innerWidth + 120, 
        right: 40, 
        top: -window.innerHeight + 120, 
        bottom: 20 
      }}
      dragElastic={0}
      dragMomentum={false}
      className={`fixed bottom-8 z-[110] flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing ${isProjectModalOpen ? 'right-4 md:right-10' : 'right-12'}`}
      animate={{ 
        x: isProjectModalOpen ? 0 : position.x,
        y: isProjectModalOpen ? 0 : 0,
        scale: isProjectModalOpen ? 1.1 : 1
      }}
      onDragStart={() => {
        setIsAutoWalking(false);
        setPosition({ x: 0, y: 0 });
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="mb-4 pointer-events-auto"
        >
          <div className="relative glass px-6 py-3 rounded-2xl max-w-[280px] text-sm font-bold text-white border-bright-orange/40 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <p className="text-center leading-tight">{message}</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 glass border-t-0 border-l-0 rotate-45" />
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="relative w-28 h-28 pointer-events-auto cursor-pointer"
        animate={{ 
          y: [0, -4, 0],
          scaleX: direction
        }}
        transition={{ 
          y: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
          scaleX: { duration: 0.2 }
        }}
      >
        {/* Floating Props based on type */}
        <AnimatePresence>
          {type === 'data' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 -right-4"
            >
              <div className="bg-accent-blue/20 p-2 rounded-lg backdrop-blur-sm border border-accent-blue/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
            </motion.div>
          )}
          {type === 'dev' && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: -30 }}
              exit={{ opacity: 0 }}
              className="absolute top-4"
            >
              <div className="text-[10px] font-mono text-emerald-400 bg-black/40 px-2 py-1 rounded border border-emerald-500/30">
                {"{ code }"}
              </div>
            </motion.div>
          )}
          {type === 'project' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div className="bg-bright-orange/20 p-2 rounded-full backdrop-blur-sm border border-bright-orange/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
            </motion.div>
          )}
          {type === 'secret' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div className="bg-bright-orange/20 p-2 rounded-full backdrop-blur-sm border border-bright-orange/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dev Fox SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]">
          {/* Tail */}
          <motion.path
            d="M75 75 Q 95 65 90 45 Q 85 25 65 35"
            fill="#f97316"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Hoodie Body */}
          <rect x="25" y="50" width="50" height="40" rx="12" fill={type === 'data' ? "#334155" : "#1e293b"} />
          <path d="M25 65 Q 50 60 75 65" fill="none" stroke="#334155" strokeWidth="2" />
          
          {/* Head */}
          <path d="M25 40 L 50 10 L 75 40 Q 75 65 50 70 Q 25 65 25 40" fill="#f97316" />
          
          {/* Ears */}
          <path d="M30 30 L 15 5 L 45 20" fill="#ea580c" />
          <path d="M70 30 L 85 5 L 55 20" fill="#ea580c" />
          
          {/* Face White Part */}
          <path d="M25 45 Q 35 60 50 60 Q 65 60 75 45" fill="white" />
          
          {/* Tech Glasses */}
          <rect x="28" y="32" width="44" height="14" rx="4" fill="#0f172a" stroke={type === 'data' ? "#38bdf8" : "#f97316"} strokeWidth="1.5" />
          <rect x="30" y="34" width="18" height="10" rx="2" fill={type === 'data' ? "#38bdf8" : "#f97316"} opacity="0.4" />
          <rect x="52" y="34" width="18" height="10" rx="2" fill={type === 'data' ? "#38bdf8" : "#f97316"} opacity="0.4" />
          
          {/* Eyes behind glasses */}
          {!isBlinking ? (
            <>
              <circle cx="39" cy="39" r="2" fill="white" />
              <circle cx="61" cy="39" r="2" fill="white" />
            </>
          ) : (
            <>
              <rect x="35" y="38" width="8" height="2" fill="#1e293b" />
              <rect x="57" y="38" width="8" height="2" fill="#1e293b" />
            </>
          )}
          
          {/* Nose */}
          <circle cx="50" cy="55" r="2.5" fill="#1e293b" />
          
          {/* Paws */}
          <rect x="32" y="85" width="12" height="6" rx="3" fill="#ea580c" />
          <rect x="56" y="85" width="12" height="6" rx="3" fill="#ea580c" />
        </svg>
        
        {/* Glow */}
        <div className="absolute inset-0 bg-accent-blue/5 blur-3xl rounded-full -z-10" />
      </motion.div>
    </motion.div>
  );
};
