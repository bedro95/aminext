"use client";

import { motion } from "framer-motion";
import { Twitter, ShieldCheck } from "lucide-react";

export default function ScientificPassport({ address }: { address?: string }) {
  // 🧠 Logic to determine rank based on the wallet address provided
  const getRank = (wallet?: string) => {
    if (!wallet || wallet === "") {
      return { 
        name: "Unauthorized Subject", 
        color: "from-gray-500 to-gray-700", 
        glow: "shadow-none",
        displayAddress: "NEURAL LINK REQUIRED" 
      };
    }

    // Logic: Higher ranks for specific wallet characteristics (Placeholder logic)
    const isLegendary = wallet.length > 42; 
    const isSpecialist = wallet.startsWith("4") || wallet.startsWith("S");

    if (isLegendary) return { 
      name: "Legendary Scientist", 
      color: "from-purple-600 via-pink-500 to-yellow-400", 
      glow: "shadow-[0_0_40px_rgba(168,85,247,0.4)]",
      displayAddress: wallet
    };
    
    if (isSpecialist) return { 
      name: "Quantum Specialist", 
      color: "from-blue-600 to-cyan-400", 
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      displayAddress: wallet
    };

    return { 
      name: "Rookie Analyst", 
      color: "from-green-500 to-emerald-400", 
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      displayAddress: wallet
    };
  };

  const rank = getRank(address);

  // Function to handle sharing on X
  const shareOnX = () => {
    const text = `I just received my Official Scientific Passport from Senku Protocol! 🧪🚀\n\nRank: ${rank.name}\nNeural ID: Verified ✅\n\nJoin the lab at senku.fun\n@itsabader #SenkuProtocol $SENKU`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-[380px] h-[230px] rounded-[28px] overflow-hidden border border-white/10 p-7 glass-morphism ${rank.glow} transition-all duration-500`}
      >
        {/* Dynamic Background Glow */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${rank.color} opacity-20 blur-[60px]`} />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] mb-1">Neural Identity Card</span>
              <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase leading-none">Senku Protocol</h3>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-white/5">
              <img src="/Senku-icon.png" className="w-10 h-10 object-contain" alt="Logo" />
            </div>
          </div>

          {/* Middle Section (Wallet Info) */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest font-bold">Authorized Subject</span>
            <div className="text-[13px] font-mono text-[#00FFCC] truncate w-64 drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]">
              {rank.displayAddress}
            </div>
            <div className="text-[9px] font-mono text-white/40">NEURAL_ID: #SQ-{address ? address.slice(-4).toUpperCase() : "NULL"}</div>
          </div>

          {/* Bottom Section (Rank) */}
          <div className="flex justify-between items-end pt-5 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-white/30 uppercase mb-1 font-bold">Access Rank</span>
              <div className={`text-sm font-black uppercase tracking-widest bg-gradient-to-r ${rank.color} bg-clip-text text-transparent`}>
                {rank.name}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <ShieldCheck className="w-6 h-6 text-[#00FFCC] drop-shadow-[0_0_10px_#00FFCC]" />
              <span className="text-[7px] font-mono text-[#00FFCC] uppercase font-bold tracking-tighter">Verified by Senku AI</span>
            </div>
          </div>
        </div>

        {/* Realistic Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
      </motion.div>

      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(29, 161, 242, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={shareOnX}
        className="flex items-center gap-3 px-10 py-4 bg-[#1DA1F2] text-white rounded-full font-black text-xs tracking-[0.2em] shadow-lg transition-all"
      >
        <Twitter className="w-5 h-5 fill-current" />
        SHARE NEURAL IDENTITY
      </motion.button>
    </div>
  );
}
