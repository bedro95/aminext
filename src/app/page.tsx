"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, Shield, Radar, Search, Trophy, 
  Zap, BarChart3, FlaskConical, Map, Activity,
  Cpu, Globe, Flame
} from "lucide-react";

import RoadmapTab from "../../components/Tabs/RoadmapTab";
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";
import { useCryptoData } from "../../hooks/useCryptoData";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#00FFCC]" },
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#00FFCC]" },
  { id: "roadmap", label: "Roadmap", icon: Map, color: "text-[#fbbf24]" }, 
  { id: "hall of fame", label: "Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  const { prices, gas } = useCryptoData();
  
  useAudioController();

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "scan": return <ScanTab />;
      case "rug shield": return <RugShieldTab />;
      case "radar": return <RadarTab />;
      case "roadmap": return <RoadmapTab />; 
      case "hall of fame": return <HallOfFameTab />;
      default: return <ScanTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FFCC]/30 overflow-x-hidden font-sans">
      
      {/* 🌌 INTERSTELLAR BACKDROP */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] glow-mesh opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] glow-mesh opacity-30 animate-pulse" style={{ background: 'radial-gradient(circle, #00E0FF 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        {/* 📊 REAL-TIME TRACKER BAR */}
        <div className="w-full flex justify-between px-6 py-2 mb-4 glass-morphism rounded-full text-[10px] font-mono tracking-tighter uppercase text-white/60 overflow-x-auto whitespace-nowrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#00FFCC] rounded-full animate-ping" />
            BTC: <span className="text-white">${prices.btc.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            ETH: <span className="text-white">${prices.eth.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            SOL: <span className="text-white">${prices.sol.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-3 h-3 text-orange-500" />
            GAS: <span className="text-white">{gas} Gwei</span>
          </div>
        </div>

        <div className="w-full bg-black/40 border border-white/10 rounded-[35px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,204,0.1)] flex flex-col">
          
          {/* 🧪 LEGENDARY HEADER */}
          <div className="w-full px-5 md:px-10 py-6 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-[#00FFCC]/[0.05] to-transparent">
            <div className="flex items-center gap-4 md:gap-6">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="relative w-12 h-12 md:w-16 md:h-16 bg-black border border-[#00FFCC]/50 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.3)]"
              >
                <Cpu className="w-8 h-8 text-[#00FFCC]" />
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic">
                  SENKU<span className="text-[#00FFCC] neon-text">.PRO</span>
                </h1>
                <div className="flex items-center gap-2">
                   <Globe className="w-3 h-3 text-[#00FFCC] animate-spin-slow" />
                   <span className="text-[8px] md:text-[10px] font-mono tracking-[0.5em] text-[#00FFCC]/80 uppercase">Decentralized Intelligence Network</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
               <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,204,0.4)" }}
                className="px-6 py-2 bg-[#00FFCC] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all"
               >
                Connect Terminal
               </motion.button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[60vh] md:min-h-[75vh]">
            
            {/* 🛡️ NAV WITH LIQUID ANIMATIONS */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:w-32 border md:border-r border-white/10 flex md:flex-col items-center justify-around md:justify-center gap-1 md:gap-8 p-4 md:p-6 bg-black/90 md:bg-transparent backdrop-blur-3xl rounded-[30px] md:rounded-none z-[200]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-4 md:p-6 rounded-[24px] transition-all duration-500 group ${isActive ? "bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" : "opacity-30 hover:opacity-100"}`}
                  >
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 ${isActive ? "text-[#00FFCC]" : "text-white"}`} />
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute -bottom-2 md:-right-[33px] md:top-1/2 md:-translate-y-1/2 w-8 h-[4px] md:w-1.5 md:h-16 bg-[#00FFCC] rounded-full shadow-[0_0_25px_#00FFCC]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ⚡ CONTENT */}
            <main className="flex-1 relative p-4 md:p-12 pb-56 md:pb-12 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* 📡 FOOTER */}
          <footer className="hidden md:flex w-full px-10 py-5 justify-between items-center bg-black/80 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/30 uppercase italic">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-3 text-[#00FFCC]">
                <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" /> 
                System_Status: Optimal
              </span>
              <span className="text-white/50 border-l border-white/10 pl-8">Latency: 24ms</span>
              <span className="text-white/50 border-l border-white/10 pl-8">Uptime: 99.99%</span>
            </div>
            <div className="flex items-center gap-3 text-[#00FFCC]/60">
              <Activity className="w-4 h-4" />
              Processing Engine v3.0.0-PRO
            </div>
          </footer>
        </div>
      </div>

      {/* 🚀 AGENT */}
      <div className="fixed bottom-28 right-4 md:bottom-10 md:right-10 z-[50]">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
