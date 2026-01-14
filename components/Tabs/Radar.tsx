"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Radio, ChevronRight, Zap, Target, Waves, Search, BarChart3 } from 'lucide-react';

const RadarTab = () => {
  const [topGainer, setTopGainer] = useState<any>(null);
  const [whaleMovements, setWhaleMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveRadarData = async () => {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=solana');
      const data = await response.json();
      
      if (data.pairs && data.pairs.length > 0) {
        // نختار أقوى 15 عملة تشهد "انفجار" في السيولة الآن
        const sortedPairs = data.pairs.sort((a: any, b: any) => b.volume.m5 - a.volume.m5);
        const leader = sortedPairs[0];
        
        setTopGainer({
          name: leader.baseToken.name,
          symbol: leader.baseToken.symbol,
          price: leader.priceUsd,
          volume: leader.volume.h24 > 1000000 ? (leader.volume.h24 / 1000000).toFixed(2) + "M" : (leader.volume.h24 / 1000).toFixed(1) + "K",
          change: leader.priceChange.h1,
          liq: leader.liquidity?.usd?.toLocaleString() || "0",
          m5Change: leader.priceChange.m5
        });

        const logs = sortedPairs.slice(1, 15).map((pair: any) => ({
          id: pair.pairAddress,
          token: pair.baseToken.symbol,
          amount: pair.volume.m5,
          type: pair.priceChange.m5 > 0 ? "ACCUMULATION" : "DISTRIBUTION",
          color: pair.priceChange.m5 > 0 ? "#00FF5F" : "#FF3B3B",
          score: Math.floor(Math.random() * 100) // تقييم زخم وهمي حالياً
        }));
        
        setWhaleMovements(logs);
      }
      setLoading(false);
    } catch (err) { console.error("Network Sync Error"); }
  };

  useEffect(() => {
    fetchLiveRadarData();
    const interval = setInterval(fetchLiveRadarData, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    // الحل النهائي لمشكلة التمرير: overflow-y-auto مع min-h-screen
    <div className="w-full min-h-screen overflow-y-auto touch-pan-y bg-black text-white font-mono pb-40 px-4">
      
      {/* 📡 HEADER SECTION */}
      <div className="flex justify-between items-center py-6 mb-4">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00FF5F]/10 rounded-lg border border-[#00FF5F]/20">
               <Radio className="w-4 h-4 text-[#00FF5F] animate-pulse" />
            </div>
            <h2 className="text-sm font-black tracking-[0.3em] uppercase">Senku Signal Radar</h2>
         </div>
         <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F] animate-ping" />
            <span className="text-[9px] font-bold uppercase opacity-60">Live Mainnet</span>
         </div>
      </div>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        
        {/* 🪐 CENTRAL ANALYTICS (The Visual Core) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="relative min-h-[400px] rounded-[40px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 overflow-hidden flex flex-col items-center justify-center shadow-2xl"
        >
          {/* Subtle Radar Waves */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <div className="w-[300px] h-[300px] border border-[#00FF5F] rounded-full animate-ping" />
             <div className="absolute w-[450px] h-[450px] border border-white/10 rounded-full" />
          </div>

          {!loading && topGainer ? (
            <motion.div key={topGainer.symbol} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center relative z-10">
              <span className="text-[#00FF5F] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Strongest Momentum</span>
              <h1 className="text-7xl font-black mb-2 tracking-tighter">{topGainer.symbol}</h1>
              <p className="text-white/40 text-xs mb-8 uppercase tracking-widest">{topGainer.name}</p>
              
              <div className="grid grid-cols-3 gap-4 bg-black/40 backdrop-blur-md p-6 rounded-[25px] border border-white/5">
                 <div>
                    <p className="text-[8px] text-white/30 uppercase mb-1">Volume 24h</p>
                    <p className="text-sm font-black text-white">${topGainer.volume}</p>
                 </div>
                 <div className="border-x border-white/10">
                    <p className="text-[8px] text-white/30 uppercase mb-1">1h Change</p>
                    <p className={`text-sm font-black ${topGainer.change > 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>{topGainer.change}%</p>
                 </div>
                 <div>
                    <p className="text-[8px] text-white/30 uppercase mb-1">Liquidity</p>
                    <p className="text-sm font-black text-[#00E0FF]">${topGainer.liq.split(',')[0]}K</p>
                 </div>
              </div>
            </motion.div>
          ) : (
             <Zap className="w-12 h-12 text-[#00FF5F] animate-bounce opacity-20" />
          )}
        </motion.div>

        {/* 📜 DATA FEED (The "Fayda" Section) */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Market Heatmap</h3>
              <BarChart3 className="w-4 h-4 text-white/20" />
           </div>

           <div className="flex flex-col gap-3">
             <AnimatePresence mode="popLayout">
               {whaleMovements.map((move, idx) => (
                 <motion.div 
                   key={move.id + idx}
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                   className="bg-[#0A0A0A] border border-white/5 p-5 rounded-[25px] flex justify-between items-center group active:bg-white/5 transition-all"
                 >
                    <div className="flex flex-col">
                       <span className="text-[14px] font-black text-white tracking-tight">{move.token}</span>
                       <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">{move.type}</span>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="text-[13px] font-black" style={{ color: move.color }}>+${(move.amount/1000).toFixed(1)}K</p>
                          <div className="flex items-center justify-end gap-1 mt-0.5">
                             <div className="w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00FF5F]" style={{ width: `${move.score}%` }} />
                             </div>
                             <span className="text-[7px] text-white/40 font-bold">{move.score}%</span>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-white/10" />
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RadarTab;
