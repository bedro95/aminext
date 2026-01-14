"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Zap, Coins, Lock } from 'lucide-react';

const roadmapData = [
  { 
    phase: "Phase 1", 
    title: "Foundation", 
    status: "Completed", 
    icon: Rocket, 
    color: "#00FF5F",
    desc: "Core Neural Interface and RugShield Security Audit deployment." 
  },
  { 
    phase: "Phase 2", 
    title: "Neural Expansion", 
    status: "In Progress", 
    icon: Target, 
    color: "#00E0FF",
    desc: "Whale Radar integration and social sentiment AI analysis."
  },
  { 
    phase: "Phase 3", 
    title: "Token Genesis", 
    status: "Upcoming", 
    icon: Coins, 
    color: "#fbbf24",
    desc: "Launch of $SENKU token and integration of Token-Gated premium features." 
  },
  { 
    phase: "Phase 4", 
    title: "Ecosystem Utility", 
    status: "Concept", 
    icon: Lock, 
    color: "#FFFFFF",
    desc: "Staking nodes and DAO governance for protocol upgrades." 
  }
];

const RoadmapTab = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8 font-mono">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">
          Senku <span className="text-[#00FF5F]">Protocols</span>
        </h2>
        <p className="text-[10px] text-white/30 mt-2 uppercase tracking-widest italic">Evolutionary Roadmap 2026</p>
      </div>

      <div className="relative border-l-2 border-[#00FF5F]/20 ml-4 space-y-12">
        {roadmapData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-10"
          >
            {/* Glow Point */}
            <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-black border-2 border-[#00FF5F] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,95,0.4)]">
               <item.icon className="w-3 h-3" style={{ color: item.color }} />
            </div>

            <div className="bg-[#0A0A0A]/80 border border-white/5 p-6 rounded-[30px] backdrop-blur-3xl hover:border-[#00FF5F]/30 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black tracking-[0.2em]" style={{ color: item.color }}>{item.phase}</span>
                <span className="text-[8px] bg-white/5 px-2 py-1 rounded-md text-white/40 uppercase">{item.status}</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase group-hover:text-[#00FF5F] transition-colors">{item.title}</h3>
              <p className="text-white/40 text-[10px] mt-3 leading-relaxed uppercase tracking-tighter">
                {item.desc}
              </p>
              
              {/* Token-Utility Indicator for Phase 3 & 4 */}
              {index >= 2 && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[#00FF5F]" />
                  <span className="text-[8px] text-[#00FF5F] font-bold uppercase tracking-widest italic">Powered by $SENKU</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTab;

