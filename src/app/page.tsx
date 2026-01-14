"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Shield, Radar, Search, Trophy, Zap, BarChart3, FlaskConical, LayoutGrid, Activity, Users, TrendingUp } from "lucide-react";

// Components
import RoadmapTab from "../../components/Tabs/RoadmapTab";
import SenkuAgent from "../../components/Agent/SenkuAgent";
import ScanTab from "../../components/Tabs/Scan";
import RugShieldTab from "../../components/Tabs/RugShield";
import RadarTab from "../../components/Tabs/Radar";
import HallOfFameTab from "../../components/Tabs/HallOfFame";
import { useAudioController } from "../../hooks/useAudio";

const TABS = [
  { id: "scan", label: "Scanner", icon: Search, color: "text-[#00FF5F]" },
  { id: "rug shield", label: "Security", icon: Shield, color: "text-[#00E0FF]" },
  { id: "radar", label: "Radar", icon: Radar, color: "text-[#00FF5F]" },
  { id: "bags", label: "Bags Tool", icon: LayoutGrid, color: "text-[#22C55E]" },
  { id: "hall of fame", label: "Alpha", icon: Trophy, color: "text-[#FFFFFF]" }, 
] as const;

export default function SenkuUltraPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("scan");
  
  useAudioController();

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "scan": return <ScanTab />;
      case "rug shield": return <RugShieldTab />;
      case "radar": return <RadarTab />;
      case "bags": return (
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl mx-auto px-2 pb-10">
          <div className="p-6 md:p-8 text-center border border-[#22C55E]/30 bg-[#22C55E]/5 rounded-[32px] backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
               <TrendingUp className="w-12 h-12 text-[#22C55E]" />
            </div>
            <h2 className="text-[#22C55E] text-2xl md:text-3xl font-black mb-2 uppercase tracking-tighter italic">Bags Social Pulse</h2>
            <p className="text-white/80 text-xs md:text-sm font-medium leading-relaxed mb-6">
               Advanced Social-to-Yield Intelligence Tool.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
               <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Activity className="w-4 h-4 text-[#22C55E] mb-2" />
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Sentiment</div>
                  <div className="text-sm font-mono text-[#22C55E]">BULLISH</div>
               </div>
               <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Users className="w-4 h-4 text-[#00E0FF] mb-2" />
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Active Bags</div>
                  <div className="text-sm font-mono text-[#00E0FF]">1,402</div>
               </div>
               <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <Zap className="w-4 h-4 text-[#fbbf24] mb-2" />
                  <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Alpha Score</div>
                  <div className="text-sm font-mono text-[#fbbf24]">98/100</div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-left">
               <h4 className="text-[10px] font-black text-[#22C55E] uppercase tracking-[0.2em] mb-3">Tool Function:</h4>
               <p className="text-[11px] text-white/50 leading-relaxed italic">
                  "Senku Neural Engine scans the BagsApp ecosystem to identify high-velocity social trends before they hit the charts. It connects social engagement with on-chain liquidity to give you the ultimate Alpha."
               </p>
            </div>
          </div>
        </div>
      );
      case "hall of fame": return <HallOfFameTab />;
      default: return <ScanTab />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FF5F]/30 overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#001a0a_0%,#000_100%)] opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl min-h-screen flex flex-col pt-4 md:pt-6 pb-32 md:pb-20 px-4">
        
        <div className="w-full bg-black/40 border border-white/5 rounded-[35px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col">
          
          {/* HEADER (Enhanced for Mobile) */}
          <div className="w-full px-5 md:px-10 py-5 md:py-8 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="relative w-10 h-10 md:w-14 md:h-14 bg-black border border-[#00FF5F]/30 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(0,255,95,0.1)]">
                <span className="text-xl md:text-3xl font-black text-[#00FF5F] drop-shadow-sm">S</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base md:text-2xl font-black tracking-tighter uppercase italic">
                  SENKU<span className="text-[#00FF5F]">.FUN</span>
                </h1>
                <span className="text-[6px] md:text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Neural Interface v2.5</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
               <div className="px-2.5 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]"></span>
                  </span>
                  <span className="text-[7px] md:text-[9px] font-black text-[#22C55E] uppercase tracking-widest">Bags_Sync</span>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[65vh] md:min-h-[75vh]">
            
            {/* NAVIGATION (Mobile Floating Nav Optimized) */}
            <nav className="fixed bottom-6 left-6 right-6 md:relative md:bottom-auto md:left-auto md:right-auto md:w-32 border md:border-r border-white/10 md:border-white/5 flex md:flex-col items-center justify-around md:justify-center gap-1 md:gap-5 p-3 md:p-6 bg-black/95 md:bg-black/40 backdrop-blur-3xl rounded-[24px] md:rounded-none z-[200] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-3.5 md:p-5 rounded-2xl md:rounded-[22px] transition-all duration-300 ${isActive ? "bg-white/10 border border-white/10" : "opacity-20 hover:opacity-100"}`}
                  >
                    <Icon className={`w-5 h-5 md:w-7 md:h-7 ${isActive ? tab.color : "text-white"}`} />
                    {isActive && (
                      <motion.div layoutId="navIndicator" className="absolute -bottom-1 md:-right-[33px] md:top-1/2 md:-translate-y-1/2 w-6 h-1 md:w-1 md:h-12 bg-[#00FF5F] rounded-full shadow-[0_0_20px_#00FF5F]" />
                    )}
                  </button>
                );
              })}
            </nav>

            <main className="flex-1 relative p-4 md:p-12 pb-44 md:pb-12 overflow-y-auto max-h-[70vh] md:max-h-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full h-full"
                >
                  {renderTabContent}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      {/* 🚀 SENKU AGENT POSITIONING FOR VIDEO DEMO */}
      <div className="fixed bottom-36 right-6 md:bottom-10 md:right-10 z-[150] scale-[0.75] md:scale-100 origin-bottom-right">
        <SenkuAgent activeTab={activeTab} />
      </div>
    </div>
  );
}
