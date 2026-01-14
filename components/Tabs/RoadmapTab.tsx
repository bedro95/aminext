"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  Coins, 
  Lock, 
  ChevronRight, 
  FlaskConical 
} from 'lucide-react';

/**
 * Roadmap Data Structure
 * Engineered to include Token-Gated milestones and futuristic development phases.
 */
const ROADMAP_STEPS = [
  { 
    phase: "PHASE 01", 
    title: "Neural Foundation", 
    status: "STABLE", 
    icon: Rocket, 
    color: "#00FF5F", // Neon Green
    description: "Deployment of the core Senku Neural Interface and RugShield audit protocols for Solana smart contracts." 
  },
  { 
    phase: "PHASE 02", 
    title: "Intelligence Expansion", 
    status: "SYNCING", 
    icon: Target, 
    color: "#00E0FF", // Neon Blue
    description: "Integration of Whale Radar and social sentiment AI engines to track market manipulation in real-time."
  },
  { 
    phase: "PHASE 03", 
    title: "Token Genesis", 
    status: "UPCOMING", 
    icon: Coins, 
    color: "#fbbf24", // Gold/Amber
    description: "Launch of $SENKU Utility Token. Implementing Token-Gated access for high-tier analytics and private nodes." 
  },
  { 
    phase: "PHASE 04", 
    title: "The Singularity", 
    status: "ENCRYPTED", 
    icon: Lock, 
    color: "#FFFFFF", 
    description: "Transitioning to a decentralized governance (DAO) where $SENKU holders dictate the laboratory's evolution." 
  }
];

const RoadmapTab = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-6 font-mono selection:bg-[#00FF5F]/30">
      
      {/* SECTION HEADER */}
      <header className="text-center mb-16 space-y-2">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-3 mb-4"
        >
          <FlaskConical className="w-6 h-6 text-[#00FF5F] animate-pulse" />
          <h2 className="text-3xl font-black text-white uppercase tracking-[0.4em]">
            Evolution <span className="text-[#00FF5F]">Map</span>
          </h2>
        </motion.div>
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
          Strategic trajectory for the Senku Neural Protocol
        </p>
      </header>

      {/* ROADMAP TIMELINE */}
      <div className="relative border-l border-white/10 ml-6 space-y-8">
        {ROADMAP_STEPS.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-12 group"
          >
            {/* NODE POINT */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-[#00FF5F] transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00FF5F] group-hover:shadow-[0_0_10px_#00FF5F] transition-all" />
            </div>

            {/* CONTENT CARD */}
            <div className="bg-[#0A0A0A]/60 border border-white/5 p-8 rounded-[35px] backdrop-blur-2xl hover:bg-black/80 hover:border-[#00FF5F]/20 transition-all duration-500 relative overflow-hidden">
              
              {/* BACKDROP GLOW */}
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <step.icon className="w-24 h-24" style={{ color: step.color }} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-white/5" style={{ color: step.color }}>
                      {step.phase}
                    </span>
                    <ChevronRight className="w-3 h-3 text-white/20" />
                    <span className="text-[8px] font-bold text-white/30 tracking-widest uppercase">
                      Status: {step.status}
                    </span>
                  </div>
                  <step.icon className="w-5 h-5 opacity-50" style={{ color: step.color }} />
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform">
                  {step.title}
                </h3>
                
                <p className="text-[11px] text-white/50 leading-relaxed uppercase tracking-wide max-w-lg">
                  {step.description}
                </p>

                {/* TOKEN UTILITY INDICATOR (Phases 3 & 4) */}
                {index >= 2 && (
                  <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4">
                    <Zap className="w-3 h-3 text-[#00FF5F]" />
                    <span className="text-[9px] text-[#00FF5F] font-black uppercase tracking-widest italic">
                      Requires $SENKU Neural Authorization
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <footer className="mt-20 text-center">
        <div className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-[9px] text-white/30 uppercase font-bold tracking-[0.2em]">
            Protocol Version: 2.5.0-LABS | Node_Active: True
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RoadmapTab;
