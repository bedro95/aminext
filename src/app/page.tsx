"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Globe, Zap, BarChart3 } from "lucide-react";

// Components
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

// BagsApp Inspired Color Palette
const TABS = [
  { id: "scan", label: "Bags Scanner", icon: Search, color: "text-[#00FF5F]" }, // Bags Green
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" }, // Bags Cyan
  { id: "radar", label: "Deal Radar", icon: Radar, color: "text-[#00FF5F]" }, 
  { id: "hall of fame", label: "Top Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useAudioController();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-[#00FF5F]/30">
      
      {/* 🌌 BAGS THEME GRADIENT BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
        
        {/* Animated Bags Orbs */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00FF5F]/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00E0FF]/5 blur-[120px] rounded-full" 
        />
      </div>

      {/* 🛰️ THE COMMAND CENTER */}
      <div className="relative z-10 w-full max-w-7xl h-[92vh] bg-black/60 border border-[#00FF5F]/10 rounded-[30px] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
        
        {/* TOP STATUS BAR */}
        <div className="w-full px-10 py-6 flex justify-between items-center border-b border-[#00FF5F]/5 bg-white/[0.01]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[#00FF5F] rounded-md">
                <BarChart3 className="w-4 h-4 text-black" />
              </div>
              <span className="text-[14px] font-black uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-[#00FF5F] to-[#00E0FF]">
                Senku x Bags
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="hidden md:flex items-center gap-2 opacity-60">
              <div className="w-2 h-2 rounded-full bg-[#00FF5F] animate-ping" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#00FF5F]">Live Integration Active</span>
            </div>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
            href="https://github.com/bedro95"
            target="_blank"
            className="flex items-center gap-3 bg-[#00FF5F]/5 border border-[#00FF5F]/20 px-5 py-2 rounded-lg transition-all"
          >
            <span className="text-[10px] font-mono text-[#00FF5F] tracking-tighter">operator_bedro95</span>
            <Github className="w-4 h-4 text-white" />
          </motion.a>
        </div>

        <div className="flex-grow flex flex-col md:flex-row">
          
          {/* SIDE NAVIGATION */}
          <nav className="w-full md:w-24 border-r border-white/5 flex md:flex-col items-center justify-center gap-10 p-4 bg-black/20">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative p-4 rounded-xl transition-all duration-300 group ${isActive ? "bg-[#00FF5F]/10 border border-[#00FF5F]/20" : "hover:bg-white/5"}`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? tab.color : "text-white/20 group-hover:text-white/40"}`} />
                  {isActive && (
                    <motion.div 
                      layoutId="navLight" 
                      className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#00FF5F] rounded-r-full shadow-[0_0_20px_#00FF5F]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* MAIN STAGE */}
          <main className="flex-grow relative flex items-center justify-center p-6 md:p-12 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-95">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-5xl"
              >
                {activeTab === "scan" && <ScanTab />}
                {activeTab === "rug shield" && <RugShieldTab />}
                {activeTab === "radar" && <RadarTab />}
                {activeTab === "hall of fame" && <HallOfFameTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* ANALYTICS FOOTER */}
        <footer className="w-full px-10 py-5 flex justify-between items-center bg-black/80 border-t border-[#00FF5F]/10 text-[10px] font-mono tracking-[0.1em] text-white/40 uppercase">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00FF5F]" /> Bags_Network: Synced</span>
            <span className="text-[#00E0FF]">System: 10 Billion Percent Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-[#00FF5F]" />
            Senku Protocol v2.0
          </div>
        </footer>
      </div>

      <div className="fixed bottom-10 right-10 z-[100] scale-110">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
