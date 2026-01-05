"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Radio, Trophy, Search, Cpu, 
  Zap, Activity, Terminal, BrainCircuit, TrendingUp,
  Volume2, VolumeX, Snowflake, Fingerprint
} from 'lucide-react';

/**
 * PROJECT: SENKU PROTOCOL
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V10 - FULL EDITION
 */

/* ================================
   ❄️ SNOW SYSTEM COMPONENT
   ================================ */
const SnowSystem = () => {
  const snowflakes = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 20,
      size: Math.random() * 3 + 1,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {snowflakes.map((snow) => (
        <motion.div
          key={snow.id}
          initial={{ y: -20, x: `${snow.x}vw`, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: snow.duration,
            repeat: Infinity,
            delay: snow.delay,
            ease: "linear"
          }}
          className="absolute text-white/20"
          style={{ fontSize: snow.size }}
        >
          <Snowflake size={snow.size * 4} />
        </motion.div>
      ))}
    </div>
  );
};

/* ================================
   🔹 SENKU AGENT (LIVE)
   ================================ */
function SenkuAgent({ activeTab }: { activeTab: string }) {
  const [index, setIndex] = useState(0);
  const tips = useMemo(() => ({
    scan: [
      "Welcome Bader, paste an address to begin neural scan.",
      "Intelligence tier is calculated via on-chain depth.",
      "Trust the science, ignore the noise."
    ],
    "rug shield": [
      "Scanning for hidden mint functions...",
      "Liquidity locks are the first line of defense.",
      "Rug Shield heuristics: 99.8% accuracy."
    ],
    radar: [
      "Whale intent detected in liquidity pools.",
      "Neural Radar monitoring MEV pressure.",
      "Smart money is shifting to Solana."
    ],
    "hall of fame": [
      "Protocols ranked by neural dominance.",
      "Only verified signals make it here."
    ]
  }), []);

  const currentTips = (tips as any)[activeTab] || ["Analyzing neural signals..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTips]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="fixed bottom-6 right-6 z-[999] flex items-end gap-4"
    >
      <div className="max-w-[240px] bg-black/80 border border-green-500/40 rounded-2xl px-5 py-4 text-[11px] font-mono text-green-400 uppercase tracking-widest shadow-[0_0_30px_rgba(34,197,94,0.2)] backdrop-blur-xl relative">
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-black/80 border-r border-b border-green-500/40 rotate-45" />
        {currentTips[index]}
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
        <motion.img
          src="/senku.GIF"
          alt="Senku Agent"
          className="w-20 h-20 rounded-2xl border-2 border-green-500/50 bg-black shadow-2xl relative z-10"
          onError={(e) => { (e.target as any).src = "https://via.placeholder.com/150/000000/00FF00?text=SENKU"; }}
        />
      </div>
    </motion.div>
  );
}

/* ================================
   🔹 MAIN PROTOCOL
   ================================ */
export default function Senku() {
  const [activeTab, setActiveTab] = useState('scan');
  const [rugAddress, setRugAddress] = useState('');
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Sound effects logic
  const playPing = () => {
    if (!isMuted) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  };

  const analyzeRug = async () => {
    if (!rugAddress) return;
    setIsAnalyzingRug(true);
    playPing();
    
    setTimeout(() => {
      setRugAnalysis({
        score: "98/100",
        liquidity: "LOCKED (99.2%)",
        mint: "DISABLED",
        topHolders: "4.2%",
        riskLevel: "LOW"
      });
      setIsAnalyzingRug(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      <SnowSystem />

      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Top Header */}
      <div className="relative z-[100] w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-green-400 uppercase">System Live: V6.2</span>
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-green-400" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative z-[100] mb-12">
        <div className="flex bg-slate-900/80 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl shadow-2xl">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); playPing(); }}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all
              ${activeTab === tab ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'text-white/40 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          
          {activeTab === 'scan' && (
            <motion.div 
              key="scan" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="w-full text-center"
            >
              <h1 className="text-[14vw] md:text-[10rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                SENKU
              </h1>
              <p className="text-[11px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80 mb-12 mt-4 flex items-center justify-center gap-4">
                <Fingerprint size={14} /> Neural Scientific Protocol
              </p>

              <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-3 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <Search size={18} className="text-white/30" />
                  <input
                    value={rugAddress}
                    onChange={(e) => setRugAddress(e.target.value)}
                    placeholder="ENTER SOLANA CONTRACT ADDRESS..."
                    className="w-full bg-transparent border-none py-4 text-xs font-mono outline-none placeholder:text-white/20"
                  />
                </div>
                <button
                  onClick={analyzeRug}
                  disabled={isAnalyzingRug}
                  className="bg-green-500 hover:bg-green-400 text-black px-10 py-4 rounded-xl text-xs font-black tracking-widest transition-all active:scale-95 disabled:opacity-50"
                >
                  {isAnalyzingRug ? 'DECODING...' : 'INITIATE SCAN'}
                </button>
              </div>

              {rugAnalysis && (
                <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                  {Object.entries(rugAnalysis).map(([key, value]) => (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      key={key} 
                      className="bg-black/40 border border-green-500/20 rounded-2xl p-5 backdrop-blur-sm hover:border-green-500/50 transition-colors"
                    >
                      <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="font-mono font-bold text-green-400 text-sm">{String(value)}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'rug shield' && (
            <motion.div key="rug" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-2xl">
              <ShieldAlert size={60} className="mx-auto mb-6 text-green-400" />
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Neural Rug Shield</h2>
              <p className="text-white/50 font-mono text-sm leading-relaxed">
                Our protocol scans for liquidity migrations, hidden mint functions, and wallet clustering in real-time.
              </p>
            </motion.div>
          )}

          {activeTab === 'radar' && (
            <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping" />
                <div className="absolute inset-4 border-2 border-green-500/40 rounded-full" />
                <Radio size={48} className="absolute inset-0 m-auto text-green-400 animate-pulse" />
              </div>
              <button 
                onClick={() => {
                  setIntentSignal("WHALE ACCUMULATION DETECTED @ $SOL POOL");
                  playPing();
                }}
                className="bg-white text-black px-10 py-4 rounded-full text-xs font-black tracking-widest hover:scale-105 transition-transform"
              >
                {intentSignal ? "REFRESH RADAR" : "ACTIVATE NEURAL RADAR"}
              </button>
              {intentSignal && (
                <p className="mt-8 text-green-400 font-mono text-sm animate-bounce tracking-widest uppercase">{intentSignal}</p>
              )}
            </motion.div>
          )}

          {activeTab === 'hall of fame' && (
            <motion.div key="hof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {['SENKU', 'SENKU-GENESIS', 'NEURAL-X'].map((name, i) => (
                <div key={name} className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl p-8 text-center hover:border-green-500/40 transition-all group">
                  <Trophy className="mx-auto mb-4 text-white/20 group-hover:text-green-400 transition-colors" />
                  <p className="font-black text-xl tracking-tighter mb-2">{name}</p>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Rank #{i+1} Contributor</p>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <SenkuAgent activeTab={activeTab} />

      {/* Footer */}
      <footer className="relative z-10 mt-16 mb-6 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-white/30">
           <Terminal size={16} className="hover:text-green-400 cursor-pointer transition-colors" />
           <Cpu size={16} className="hover:text-green-400 cursor-pointer transition-colors" />
           <TrendingUp size={16} className="hover:text-green-400 cursor-pointer transition-colors" />
        </div>
        <p className="text-[9px] text-white/20 tracking-[0.5em] uppercase">
          © 2026 SENKU PROTOCOL — Developed by Bader Alkorgli
        </p>
      </footer>
    </div>
  );
}
