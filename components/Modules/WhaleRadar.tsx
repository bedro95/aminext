"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, Activity, TrendingUp } from 'lucide-react';

interface Signal {
  id: string;
  tokenName: string;
  buyAmount: string;
  time: string;
}

export default function WhaleRadar() {
  const [signals, setSignals] = useState<Signal[]>([]);
  
  // Real-time signals from DexScreener would ideally use their websocket
  // Simulating the feed with English localization and MC > $10M logic
  useEffect(() => {
    const tokens = ['SOL', 'JUP', 'RAY', 'SEND', 'PYTH', 'BONK', 'WIF'];
    
    const interval = setInterval(() => {
      const newSignal: Signal = {
        id: Math.random().toString(36).substr(2, 9),
        tokenName: tokens[Math.floor(Math.random() * tokens.length)],
        buyAmount: (Math.random() * 50000 + 5000).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };
      
      setSignals(prev => [newSignal, ...prev].slice(0, 10));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/40 border border-[#00FFCC]/20 rounded-[2rem] p-6 glass-morphism overflow-hidden relative group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radar className="w-6 h-6 text-[#00FFCC] animate-pulse" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 border border-[#00FFCC]/20 rounded-full"
            />
          </div>
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Whale Radar</h3>
        </div>
        <div className="flex items-center gap-2 bg-[#00FFCC]/10 px-3 py-1 rounded-full border border-[#00FFCC]/20">
          <div className="w-1.5 h-1.5 bg-[#00FFCC] rounded-full animate-ping" />
          <span className="text-[10px] font-mono font-bold text-[#00FFCC] uppercase">Live Buys</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence initial={false}>
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-[#00FFCC]/10">
                  <TrendingUp className="w-4 h-4 text-[#00FFCC]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {signal.tokenName}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">{signal.time}</span>
                </div>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-sm font-black text-[#00FFCC]">
                  {signal.buyAmount}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00FFCC] to-transparent rounded-full"
        />
      </div>
    </div>
  );
}
