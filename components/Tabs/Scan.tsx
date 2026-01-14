"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertTriangle, CheckCircle2, Zap, BarChart3, ShieldCheck, Activity } from 'lucide-react';

const ScanTab = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        setResult(data.pairs[0]);
      } else {
        setError("CONTRACT NOT FOUND ON SOLANA NETWORK");
      }
    } catch (err) {
      setError("COMMUNICATION ERROR WITH THE MAINNET");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* 🧬 NEON SEARCH TERMINAL */}
      <form onSubmit={handleScan} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF5F]/20 to-[#00E0FF]/20 rounded-[28px] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="PASTE CONTRACT ADDRESS (CA)..."
          className="relative w-full bg-black/60 border border-[#00FF5F]/20 p-7 rounded-[24px] text-white font-mono text-sm focus:outline-none focus:border-[#00FF5F]/60 transition-all pl-16 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00FF5F]/40 group-focus-within:text-[#00FF5F] transition-colors w-6 h-6" />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00FF5F] hover:shadow-[0_0_20px_#00FF5F] text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initiate Scan"}
        </button>
      </form>

      {/* 📊 ANALYSIS ENGINE OUTPUT */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-mono tracking-widest text-center uppercase"
          >
            <AlertTriangle className="w-4 h-4 inline-block mr-2" /> {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* MAIN TOKEN CARD (GLASS EFFECT) */}
            <div className="md:col-span-2 relative overflow-hidden bg-white/[0.02] border border-white/10 p-8 rounded-[35px] backdrop-blur-3xl group shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                <Zap className="w-24 h-24 text-[#00FF5F]" />
              </div>

              <div className="flex items-center gap-6 mb-10">
                <div className="relative">
                  <div className="absolute -inset-2 bg-[#00FF5F]/20 rounded-full blur-md animate-pulse" />
                  <img 
                    src={result.info?.imageUrl || "https://avatar.vercel.sh/senku"} 
                    alt="icon" 
                    className="relative w-16 h-16 rounded-2xl object-cover border-2 border-[#00FF5F]/30 bg-black" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-3xl text-white tracking-tighter">{result.baseToken.name}</h3>
                    <ShieldCheck className="w-5 h-5 text-[#00FF5F]" />
                  </div>
                  <p className="text-[#00FF5F] font-mono text-sm tracking-widest uppercase opacity-80">{result.baseToken.symbol} / SOL</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">Current Price</p>
                  <p className="text-2xl font-mono text-white font-bold leading-none">
                    ${parseFloat(result.priceUsd).toFixed(8)}
                  </p>
                </div>
                <div className="space-y-2 text-right">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">24H Evolution</p>
                  <p className={`text-2xl font-mono font-bold leading-none ${result.priceChange.h24 >= 0 ? 'text-[#00FF5F]' : 'text-red-500'}`}>
                    {result.priceChange.h24 >= 0 ? '+' : ''}{result.priceChange.h24}%
                  </p>
                </div>
              </div>
            </div>

            {/* ALPHA STATS COLUMN */}
            <div className="space-y-4">
              <div className="bg-[#00FF5F]/5 border border-[#00FF5F]/10 p-6 rounded-[28px] backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Liquidity Pool</span>
                  <Activity className="w-3 h-3 text-[#00FF5F]" />
                </div>
                <p className="text-xl font-mono text-white font-bold">${result.liquidity?.usd?.toLocaleString()}</p>
                <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    className="h-full bg-[#00FF5F]"
                  />
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px] backdrop-blur-xl space-y-4">
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Mkt Cap</span>
                    <span className="text-xs font-mono text-white">${result.fdv?.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Volume 24H</span>
                    <span className="text-xs font-mono text-white">${result.volume.h24?.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">Bags Rating</span>
                    <span className="text-[9px] font-mono bg-[#00FF5F]/20 text-[#00FF5F] px-3 py-1 rounded-full uppercase font-black">
                      Bullish
                    </span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanTab;
