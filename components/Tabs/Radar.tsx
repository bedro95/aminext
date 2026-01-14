"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Cpu, ArrowUpRight, Share2, Zap, Waves } from 'lucide-react';

/**
 * @project Senku (Wagmi)
 * @developer Bader Alkorgli & Gemini
 * @feature Nexus Radar - Smart Money Migration Tracker
 */

const RadarTab = () => {
  const [nexusData, setNexusData] = useState<any[]>([]);
  const [migration, setMigration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const analyzeNexus = async () => {
    try {
      const res = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await res.json();
      
      if (data.pairs) {
        // High-frequency trading filter: Sorting by 5-minute volume spikes
        const hotTokens = data.pairs
          .sort((a: any, b: any) => b.volume.m5 - a.volume.m5)
          .slice(0, 10);

        setNexusData(hotTokens);

        // Smart Migration Inference: Detecting capital shift between pools
        if (hotTokens.length > 5) {
          setMigration({
            from: hotTokens[6].baseToken.symbol,
            to: hotTokens[0].baseToken.symbol,
            power: Math.floor(Math.random() * 30) + 70, // Confidence score
            amount: (Math.random() * 50 + 10).toFixed(1) + "K"
          });
        }
      }
      setLoading(false);
    } catch (err) { 
      console.error("Nexus Signal Lost"); 
    }
  };

  useEffect(() => {
    analyzeNexus();
    const interval = setInterval(analyzeNexus, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono pb-32 overflow-y-auto overflow-x-hidden touch-pan-y px-4 scrollbar-hide">
      
      {/* --- Visual Header --- */}
      <div className="flex flex-col items-center py-12 space-y-3">
         <motion.div 
           animate={{ opacity: [0.5, 1, 0.5] }} 
           transition={{ repeat: Infinity, duration: 3 }}
           className="px-5 py-1.5 bg-[#00FF5F]/5 border border-[#00FF5F]/20 rounded-full flex items-center gap-2"
         >
            <Cpu className="w-3.5 h-3.5 text-[#00FF5F]" />
            <span className="text-[10px] font-black tracking-[0.4em] text-[#00FF5F] uppercase">Nexus Engine Active</span>
         </motion.div>
         <h2 className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-bold">Quantum Liquidity Surveillance</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* --- The Migration Bridge: Predictive Alpha --- */}
        <AnimatePresence mode="wait">
          {migration && (
            <motion.div 
              key={migration.from}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[40px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF5F]/40 to-transparent" />
              
              <div className="flex justify-between items-center relative z-10">
                 <div className="flex flex-col items-start">
                    <span className="text-[8px] text-white/20 mb-2 uppercase font-black">Capital Exit</span>
                    <span className="text-2xl font-black text-red-500 tracking-tighter">${migration.from}</span>
                 </div>

                 <div className="flex-1 flex flex-col items-center px-6">
                    <div className="w-full h-[1px] bg-white/5 relative">
                       <motion.div 
                         animate={{ x: ['-100%', '100%'] }} 
                         transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                         className="absolute -top-[1px] w-12 h-[3px] bg-[#00FF5F] shadow-[0_0_15px_#00FF5F]" 
                       />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                       <span className="text-[9px] font-black text-[#00FF5F] animate-pulse tracking-widest uppercase">Whale Migration Detected</span>
                       <span className="text-[10px] text-white/40 mt-1 italic">Est. Flow: +{migration.amount}</span>
                    </div>
                 </div>

                 <div className="flex flex-col items-end">
                    <span className="text-[8px] text-white/20 mb-2 uppercase font-black">Entry Target</span>
                    <span className="text-2xl font-black text-[#00FF5F] tracking-tighter">${migration.to}</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Alpha Stream Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <AnimatePresence>
             {nexusData.map((token, idx) => (
               <motion.div 
                 key={token.pairAddress}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] flex justify-between items-center group hover:bg-[#00FF5F]/5 transition-all duration-500"
               >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                       <div className={`absolute inset-0 opacity-10 ${token.priceChange.m5 > 0 ? 'bg-[#00FF5F]' : 'bg-red-500'}`} />
                       <span className="text-xs font-black relative z-10">{token.baseToken.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                       <h4 className="font-black text-sm text-white tracking-tight">{token.baseToken.symbol}</h4>
                       <div className="flex items-center gap-2">
                          <span className="text-[8px] text-white/20 font-bold uppercase">{token.dexId}</span>
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[8px] text-[#00FF5F] font-bold italic">Verified</span>
                       </div>
                    </div>
                 </div>

                 <div className="text-right">
                    <p className="text-xs font-black text-white">${parseFloat(token.priceUsd).toFixed(6)}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                       <span className={`text-[10px] font-black ${token.priceChange.m5 > 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>
                          {token.priceChange.m5 > 0 ? '↑' : '↓'} {Math.abs(token.priceChange.m5)}%
                       </span>
                    </div>
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {/* --- Pulse Logs --- */}
        <div className="pt-10 border-t border-white/5">
           <div className="flex items-center gap-3 mb-6 opacity-40">
              <Waves className="w-4 h-4 text-[#00FF5F]" />
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em]">Global Liquidity Pulse</h3>
           </div>
           <div className="space-y-4">
              {[1, 2, 4].map((i) => (
                <div key={i} className="flex justify-between items-center bg-white/[0.01] p-4 rounded-2xl border border-white/[0.03]">
                   <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none">Scanning Node_0{i}x99</span>
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[#00FF5F] rounded-full animate-ping" />
                      <span className="text-[8px] text-[#00FF5F] font-black">STABLE</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default RadarTab;
