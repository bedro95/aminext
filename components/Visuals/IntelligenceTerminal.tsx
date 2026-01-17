"use client";

import React from 'react';
import HologramAvatar from './HologramAvatar';
import CommBox from './CommBox';
import { motion } from 'framer-motion';

export default function IntelligenceTerminal() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex flex-col w-64 gap-4"
    >
      <div className="relative aspect-square border-2 border-[#00FFCC]/30 rounded-[2rem] overflow-hidden bg-black/40 shadow-[0_0_50px_rgba(0,255,204,0.1)] group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,204,0.1)_0%,transparent_70%)]" />
        <HologramAvatar />
        
        {/* Status Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#00FFCC]/20">
          <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00FFCC]">Status: Online</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Neural Comm</span>
          <div className="w-12 h-px bg-white/10" />
        </div>
        <CommBox />
      </div>
    </motion.div>
  );
}
