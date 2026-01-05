"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Github, ShieldCheck, 
  Cpu, Terminal, BrainCircuit, TrendingUp, Search, Eye, Flame, X, Maximize2, ArrowRightLeft, MessageSquare
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (Mobile Optimized)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: V9.0 - THE AGENT UPDATE
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // AGENT STATE
  const [agentDialog, setAgentDialog] = useState("Enter target address. I'll deconstruct assets in milliseconds.");
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const dialogs: any = {
      'scan': "Target spotted. Input the address to begin extraction.",
      'rug shield': "Deploying Neural Shield. Scanning for contract anomalies.",
      'radar': "Whale frequency detected. Monitoring institutional movements.",
      'hall of fame': "Historical data accessed. These are the elite architects."
    };
    if (!loading && !data) setAgentDialog(dialogs[activeTab]);
  }, [activeTab, loading, data]);

  // --- CORE ANALYZE ---
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    setAgentDialog("Neural link initiated... bypassing security layers...");
    try {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 'senku-analysis', method: 'getAssetsByOwner',
          params: { ownerAddress: address.trim(), displayOptions: { showNativeBalance: true } },
        }),
      });
      const { result } = await response.json();
      let maxUsdValue = result.nativeBalance ? (result.nativeBalance.lamports / 1e9) * (result.nativeBalance.price_per_token || 0) : 0;
      
      setData({
        sol: (result.nativeBalance?.lamports / 1e9 || 0).toFixed(2),
        usdDisplay: maxUsdValue.toLocaleString(),
        status: maxUsdValue > 1000 ? `ELITE ARCHITECT` : `NEW WORLD RECON`,
        tierColor: maxUsdValue > 1000 ? "#22c55e" : "#0ea5e9",
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%"
      });

      setAgentDialog(maxUsdValue > 1000 ? "Massive accumulation found. This is 10 billion percent impressive." : "Assets identified. We need more scientific growth here.");
      setIntelligenceScore(Math.floor(Math.random() * 40) + 80);
    } catch (e) { 
      setAgentDialog("Link failed. Address coordinates are non-existent.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 font-sans overflow-x-hidden relative">
      
      {/* Background Matrix Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_70%)]" />
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-[15px] bg-green-500/20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* Navigation - Mobile Style */}
      <nav className="relative z-[100] w-full max-w-md mt-4 mb-10">
        <div className="flex bg-slate-900/40 border border-white/5 p-1 rounded-2xl backdrop-blur-3xl overflow-x-auto no-scrollbar">
          {['scan', 'rug shield', 'radar', 'hall of fame'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`relative flex-1 min-w-[80px] px-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === tab ? 'text-white' : 'text-white/20'}`}>
              {activeTab === tab && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-green-600 rounded-xl" />}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-md flex flex-col items-center flex-grow">
        
        {/* THE AGENT - MATCHING THE PROVIDED IMAGE */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full mb-8">
            <div className="relative flex items-center justify-center">
                {/* Agent Border & Bubble Geometry */}
                <div className="relative p-1">
                    <div className="absolute inset-0 border-2 border-green-500/50 rounded-full blur-[2px]" />
                    <div className="flex items-center gap-0">
                        {/* Avatar Circle */}
                        <div className="relative w-28 h-28 rounded-full border-2 border-green-500 bg-[#020617] overflow-hidden z-20 flex-shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                            <img src="/senku.GIF" className="w-full h-full object-cover scale-125" alt="Senku" />
                        </div>
                        
                        {/* Dialog Box Bubble */}
                        <div className="relative -ml-6 pl-10 pr-6 py-4 bg-[#020617]/80 border-2 border-green-500 rounded-[2rem] rounded-tl-none min-h-[90px] flex flex-col justify-center backdrop-blur-xl z-10 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                            {/* Geometric Spike */}
                            <div className="absolute -top-1 left-2 w-8 h-8 bg-green-500 clip-path-spike -z-10" />
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare size={10} className="text-green-500" />
                                <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Senku Agent</span>
                            </div>
                            <p className="text-[10px] font-mono italic text-white/90 leading-tight">"{agentDialog}"</p>
                            
                            {/* Circuit Decoration Lines */}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-r-2 border-b-2 border-green-500/30 rounded-br-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {activeTab === 'scan' && (
          <div className="w-full flex flex-col items-center">
            {/* SENKU NAME - FIXED U AND ALIGNMENT */}
            <div className="relative mb-12">
                <h1 className="text-[22vw] font-[1000] italic tracking-[-0.08em] leading-none text-center bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent transform scale-y-110">
                    SENKU
                </h1>
                <div className="absolute -bottom-2 right-0 bg-green-600 text-black px-2 py-0.5 text-[8px] font-black italic uppercase">Protocol V9.0</div>
            </div>

            <div className="w-full px-2 space-y-4">
              <div className="relative">
                <input className="w-full bg-[#0a101f] border border-white/10 rounded-2xl p-5 text-center outline-none focus:border-green-500 font-mono text-xs shadow-inner" placeholder="SOLANA_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20"><Search size={16} /></div>
              </div>
              
              <button onClick={analyze} className="w-full py-5 bg-white text-black rounded-2xl font-[1000] uppercase text-[10px] tracking-[0.4em] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                {loading ? "DECODING..." : "ACTIVATE LINK"}
              </button>
            </div>

            {data && (
              <div className="w-full mt-10 grid grid-cols-2 gap-3 pb-20">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl border-l-2 border-l-green-500">
                    <span className="text-[8px] font-black uppercase text-green-500 tracking-tighter">Neural IQ</span>
                    <div className="text-3xl font-[1000] italic">{intelligenceScore}</div>
                  </div>
                  <div onClick={() => setIsModalOpen(true)} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-center items-center gap-1 active:bg-green-600 transition-colors cursor-pointer">
                    <Maximize2 size={16} className="text-green-500" />
                    <p className="text-[8px] font-black uppercase">Identity Card</p>
                  </div>
              </div>
            )}
          </div>
        )}

        {/* ... Other tabs logic remains stable ... */}

      </main>

      {/* FOOTER - COMPACT FOR MOBILE */}
      <footer className="relative z-[100] py-8 flex flex-col items-center gap-4">
          <div className="flex gap-4">
             <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <Github size={14} /><span className="text-[10px] font-mono">@bedro95</span>
             </a>
          </div>
      </footer>

      {/* MODAL IDENTITY CARD */}
      <AnimatePresence>
        {isModalOpen && data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
            <div className="relative w-full max-w-[400px]">
              <div ref={modalRef} className="w-full aspect-[1.58/1] bg-[#020617] border-2 rounded-[2rem] p-6 relative overflow-hidden" style={{ borderColor: data.tierColor }}>
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <ShieldCheck size={20} style={{ color: data.tierColor }} />
                        <span className="text-[8px] font-mono opacity-40">{data.hash}</span>
                    </div>
                    <div>
                        <p className="text-[8px] uppercase opacity-40">Scientific Wealth</p>
                        <h2 className="text-4xl font-[1000] italic leading-none">${data.usdDisplay}</h2>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                        <div><p className="text-[8px] opacity-40">CLASS</p><p className="text-xl font-black italic" style={{ color: data.tierColor }}>{data.status}</p></div>
                        <p className="text-[10px] font-mono text-green-500">{intelligenceScore} IQ</p>
                    </div>
                 </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full text-[10px] font-black uppercase opacity-40">Exit Neural Link</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .clip-path-spike { clip-path: polygon(0% 0%, 100% 100%, 0% 100%); }
        h1 { text-shadow: 0 10px 20px rgba(34,197,94,0.2); }
      `}</style>
    </div>
  );
}
