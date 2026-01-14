"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, ChevronRight, TrendingUp, Zap, Target, Waves } from 'lucide-react';

const RadarTab = () => {
  const [topGainer, setTopGainer] = useState({ name: "LOADING", volume: "0", change: "0%", m5: 0 });
  const [whaleMovements, setWhaleMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveRadarData = async () => {
    try {
      // جلب بيانات حقيقية من Solana Tokens عبر DexScreener
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        const sortedPairs = data.pairs.sort((a: any, b: any) => b.volume.h1 - a.volume.h1);
        const leader = sortedPairs[0];
        
        setTopGainer({
          name: leader.baseToken.symbol,
          volume: leader.volume.h24 > 1000000 ? (leader.volume.h24 / 1000000).toFixed(1) + "M" : (leader.volume.h24 / 1000).toFixed(1) + "K",
          change: leader.priceChange.h1 > 0 ? `+${leader.priceChange.h1}%` : `${leader.priceChange.h1}%`,
          m5: leader.priceChange.m5 || 0
        });

        const logs = sortedPairs.slice(1, 7).map((pair: any) => ({
          id: pair.pairAddress,
          platform: pair.dexId.toUpperCase(),
          action: pair.priceChange.m5 > 0 ? "BULLISH ACCUMULATION" : "BEARISH DISTRIBUTION",
          amount: "$" + (pair.volume.m5 > 1000 ? (pair.volume.m5 / 1000).toFixed(1) + "K" : pair.volume.m5.toFixed(0)),
          token: pair.baseToken.symbol,
          color: pair.priceChange.m5 > 0 ? "text-[#00FF5F]" : "text-red-500",
          isHot: pair.volume.m5 > 50000
        }));
        
        setWhaleMovements(logs);
      }
      setLoading(false);
    } catch (err) {
      console.error("Radar Signal Interrupted");
    }
  };

  useEffect(() => {
    fetchLiveRadarData();
    const interval = setInterval(fetchLiveRadarData, 8000); // تحديث سريع كل 8 ثوانٍ
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-2 max-w-7xl mx-auto font-mono">
      
      {/* 📡 THE CORE SONAR (Visual Masterpiece) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-2 bg-[#050505] border border-[#00FF5F]/20 rounded-[45px] p-8 relative overflow-hidden shadow-[0_0_100px_rgba(0,255,95,0.05)] min-h-[500px] flex flex-col justify-between"
      >
        {/* Radar Background Grids */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00FF5F 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="flex justify-between items-start relative z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF5F]/20 blur-xl rounded-full animate-pulse" />
              <div className="w-12 h-12 bg-black border border-[#00FF5F]/40 rounded-2xl flex items-center justify-center relative">
                 <Radio className="w-6 h-6 text-[#00FF5F] animate-bounce" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic italic">Senku Radar</h2>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-ping" />
                 <p className="text-[#00FF5F] text-[9px] font-bold tracking-[0.3em] uppercase">Deep Chain Surveillance</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
             <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none block mb-1">Status</span>
             <span className="text-[#00FF5F] text-[10px] font-black uppercase">Active Search</span>
          </div>
        </div>

        {/* Dynamic Radar Visualization */}
        <div className="relative flex-grow flex items-center justify-center my-10">
          <div className="absolute inset-0 flex items-center justify-center">
             {[1, 2, 3, 4].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1 - (i * 0.2), scale: 1 }}
                 transition={{ repeat: Infinity, duration: 4, delay: i * 0.5, ease: "linear" }}
                 className="absolute border border-[#00FF5F]/20 rounded-full" 
                 style={{ width: `${i * 25}%`, height: `${i * 25}%` }}
               />
             ))}
          </div>
          
          {/* Sweeping Sonar Beam */}
          <div className="absolute w-full h-full bg-[conic-gradient(from_0deg,transparent_40%,rgba(0,255,95,0.15)_100%)] animate-[spin_5s_linear_infinite] rounded-full pointer-events-none" />

          {/* Central Highlighted Token */}
          <div className="z-10 text-center relative">
            <AnimatePresence mode="wait">
              {!loading ? (
                <motion.div
                  key={topGainer.name}
                  initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
                >
                  <div className="mb-4 inline-flex items-center gap-2 bg-[#00FF5F]/10 border border-[#00FF5F]/30 px-4 py-1.5 rounded-full">
                    <TrendingUp className="w-3 h-3 text-[#00FF5F]" />
                    <span className="text-[#00FF5F] text-[9px] font-black uppercase tracking-[0.2em]">Momentum Peak</span>
                  </div>
                  <h3 className="text-7xl md:text-8xl font-black text-white tracking-[ -0.05em] drop-shadow-[0_0_40px_rgba(0,255,95,0.3)]">
                    {topGainer.name}
                  </h3>
                  <div className="mt-6 flex items-center justify-center gap-6">
                    <div className="text-left">
                       <p className="text-white/20 text-[8px] uppercase font-bold tracking-widest">24h Volume</p>
                       <p className="text-white font-black text-lg">${topGainer.volume}</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-left">
                       <p className="text-white/20 text-[8px] uppercase font-bold tracking-widest">1h Change</p>
                       <p className={`text-lg font-black ${topGainer.m5 > 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>{topGainer.change}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-4 opacity-40">
                   <Zap className="w-12 h-12 text-[#00FF5F] animate-pulse" />
                   <p className="text-[10px] text-white tracking-[0.5em] animate-pulse">SYNCHRONIZING...</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="relative z-10 flex justify-between items-center pt-6 border-t border-white/5">
           <div className="flex gap-4">
              <div className="flex flex-col">
                 <span className="text-[8px] text-white/30 uppercase font-black">SOL/USD</span>
                 <span className="text-[11px] text-[#00FF5F] font-black tracking-tighter italic">MAINNET DATA</span>
              </div>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <Target className="w-3 h-3 text-[#00FF5F]" />
              <span className="text-[10px] text-white font-black">LIVE ANALYSIS</span>
           </div>
        </div>
      </motion.div>

      {/* 📜 THE VOLUME STREAM (Whale Activity) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-3 mb-2">
           <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-[#00FF5F]" />
              <h3 className="text-white font-black text-[11px] uppercase tracking-widest">Whale Activity</h3>
           </div>
           <span className="w-2 h-2 rounded-full bg-[#00FF5F] animate-ping" />
        </div>
        
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-2 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {whaleMovements.map((move, idx) => (
              <motion.div 
                key={move.id + idx}
                layout
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="relative bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 p-5 rounded-[28px] transition-all cursor-crosshair group overflow-hidden"
              >
                {/* Visual Accent for High Volume */}
                {move.isHot && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#00FF5F]/10 blur-[30px] -mr-8 -mt-8" />
                )}

                <div className="flex justify-between items-start mb-3 relative z-10">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 font-black uppercase tracking-widest">{move.platform}</span>
                      <span className={`text-[12px] font-black ${move.color} group-hover:tracking-wider transition-all`}>
                        {move.token}
                      </span>
                   </div>
                   <div className="text-right">
                      <p className={`text-[13px] font-black ${move.color}`}>{move.amount}</p>
                      <p className="text-[7px] text-white/20 font-bold uppercase tracking-tighter">VOL IN 5M</p>
                   </div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                   <span className="text-[9px] text-white/40 italic font-medium leading-none max-w-[120px]">
                      {move.action}
                   </span>
                   <div className="p-1.5 bg-black/40 rounded-lg group-hover:bg-[#00FF5F]/20 transition-colors">
                      <ChevronRight className={`w-3 h-3 ${move.color}`} />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RadarTab;
