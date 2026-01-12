"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// استدعاء المكونات من المسارات التي صححناها
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

const TABS = ["scan", "rug shield", "radar", "hall of fame"] as const;
type Tab = (typeof TABS)[number];

export default function SenkuPage() {
  const [activeTab, setActiveTab] = useState<Tab>("scan");
  const [mounted, setMounted] = useState(false);

  useAudioController();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden relative font-sans selection:bg-green-500/30">
      
      {/* 🌌 ADVANCED BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Neon Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* 🛡️ TOP HEADER / LOGO SECTION */}
      <header className="relative z-20 w-full max-w-7xl flex justify-between items-center py-4 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <span className="text-black font-black -rotate-45 text-lg">S</span>
          </div>
          <h1 className="text-xl font-black tracking-[0.3em] uppercase italic">Senku<span className="text-green-500">.</span></h1>
        </div>
        <div className="hidden md:block text-[9px] font-mono text-white/40 tracking-[0.5em] uppercase">
          Protocol Status: <span className="text-green-500">Operational</span>
        </div>
      </header>

      {/* 🧭 CYBER NAVIGATOR */}
      <nav className="relative z-20 my-8">
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-8 py-3 rounded-xl transition-all duration-500 group"
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                />
              )}
              <span className={`relative z-10 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300
                ${activeTab === tab ? "text-white" : "text-white/40 group-hover:text-white"}`}>
                {tab}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 🧠 DYNAMIC CONTENT AREA */}
      <main className="relative z-10 w-full max-w-5xl flex-grow flex items-center justify-center py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeTab === "scan" && <ScanTab />}
            {activeTab === "rug shield" && <RugShieldTab />}
            {activeTab === "radar" && <RadarTab />}
            {activeTab === "hall of fame" && <HallOfFameTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 🤖 INTERACTIVE AGENT LAYER */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-auto">
         <SenkuAgent activeTab={activeTab} />
      </div>

      {/* 🦶 MINIMALIST FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl border-t border-white/5 py-6 flex justify-between items-center text-[9px] font-mono text-white/30 tracking-widest">
        <div>© 2026 SENKU PROTOCOL</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-green-500 transition-colors">TERMINAL</a>
          <a href="#" className="hover:text-green-500 transition-colors">SECURITY</a>
          <a href="#" className="hover:text-green-500 transition-colors uppercase">Network: Solana</a>
        </div>
      </footer>
    </div>
  );
}
