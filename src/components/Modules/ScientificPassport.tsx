"use client";

import { motion } from "framer-motion";
import { Twitter, ShieldCheck } from "lucide-react";

export default function ScientificPassport({ address }: { address?: string }) {
  // Rank logic based on some placeholder "strength"
  const strength = 1000; 
  const getRank = () => {
    if (strength > 500) return { name: "Legendary Scientist", color: "from-purple-500 to-gold-400", glow: "shadow-purple-500/50" };
    if (strength > 200) return { name: "Quantum Specialist", color: "from-blue-500 to-cyan-400", glow: "shadow-blue-500/50" };
    return { name: "Rookie Analyst", color: "from-green-500 to-emerald-400", glow: "shadow-green-500/50" };
  };

  const rank = getRank();

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5 }}
        className={`relative w-[380px] h-[220px] rounded-[24px] overflow-hidden border border-white/20 p-6 glass-morphism shadow-[0_0_50px_rgba(255,255,255,0.05)] ${rank.glow} transition-shadow duration-500`}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${rank.color} opacity-20 blur-3xl`} />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Neural Identity Card</span>
              <h3 className="text-xl font-black italic text-white tracking-tighter uppercase">Senku Protocol</h3>
            </div>
            <img src="/Senku-icon.png" className="w-10 h-10 object-contain" alt="Logo" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono text-white/30 uppercase">Authorized Subject</span>
            <div className="text-sm font-mono text-[#00FFCC] truncate w-48">{walletAddress}</div>
            <div className="text-[10px] font-mono text-white/50">ID: #SQ-{Math.floor(Math.random() * 10000)}</div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-white/40 uppercase mb-1">Access Rank</span>
              <div className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
                {rank.name}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-[#00FFCC] animate-pulse" />
              <span className="text-[6px] font-mono text-[#00FFCC] uppercase font-bold">Verified by Senku AI</span>
            </div>
          </div>
        </div>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-8 py-3 bg-[#1DA1F2] text-white rounded-full font-bold text-sm shadow-[0_0_30px_rgba(29,161,242,0.3)]"
      >
        <Twitter className="w-5 h-5" />
        SHARE ON X
      </motion.button>
    </div>
  );
}
