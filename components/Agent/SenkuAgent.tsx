"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SenkuAgentProps {
  activeTab: string;
}

const SenkuAgent = ({ activeTab }: SenkuAgentProps) => {
  // تحديد رسائل تفاعلية لسنكو بناءً على التبويب
  const getAgentMessage = () => {
    switch (activeTab) {
      case 'scan': return "Analyzing the particles of this contract... 10 billion percent certainty!";
      case 'rug shield': return "Shield activated. Science is the ultimate defense against rugs.";
      case 'radar': return "Detecting whale movements in the stone world of Solana.";
      case 'hall of fame': return "The era of legends. Truly exhilarating!";
      default: return "Science is the only way forward.";
    }
  };

  // ألوان سولانا المتوافقة مع النواة
  const theme = {
    green: "#14F195",
    purple: "#9945FF",
    cyan: "#19FBDB"
  };

  return (
    <div className="relative group flex flex-col items-end p-4 select-none">
      
      {/* 💬 INTERACTIVE SCIENTIFIC BUBBLE */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.9 }}
          className="mb-4 max-w-[200px] bg-black/80 border-r-4 border-l border-t border-b border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative"
          style={{ borderColor: `${theme.green}44` }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-ping" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Senku_Comm:</span>
          </div>
          <p className="text-[11px] font-medium text-green-100 leading-relaxed italic">
            "{getAgentMessage()}"
          </p>
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#14F195]" />
        </motion.div>
      </AnimatePresence>

      {/* 🧬 THE HOLOGRAPHIC SENKU (CHARCTER CORE) */}
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        
        {/* Holographic Rings & Circles */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-[#9945FF]/30 rounded-full" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-[#14F195]/20 rounded-full" 
        />

        {/* The Character Frame */}
        <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white/10 bg-black/40 backdrop-blur-md shadow-inner group-hover:border-[#14F195]/50 transition-colors duration-500">
          
          {/* 🖼️ SENKU IMAGE */}
          <motion.img 
            src="/senku.GIF" // تأكد من وجود ملف senku.GIF في مجلد public
            alt="Senku Ishigami"
            initial={{ filter: "grayscale(1) brightness(0.8)" }}
            whileHover={{ filter: "grayscale(0) brightness(1.1)", scale: 1.1 }}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Scanline Effect (Hologram Look) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
        </div>

        {/* Energy Pulse (Glow) */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-2xl z-[-1]"
          style={{ background: `radial-gradient(circle, ${theme.green}33 0%, transparent 70%)` }}
        />

        {/* Status Indicator (Bottom Right) */}
        <div className="absolute bottom-1 right-1 w-5 h-5 bg-black border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-[#14F195] rounded-full animate-pulse shadow-[0_0_10px_#14F195]" />
        </div>
      </div>

      {/* 🧪 THE "MOTTO" UNDER CHARACTER */}
      <div className="mt-3 text-right">
        <span className="text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">
          E=mc² Protocol
        </span>
      </div>
    </div>
  );
};

export default SenkuAgent;
