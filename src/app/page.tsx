"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, ShieldCheck, Fingerprint, Volume2, 
  VolumeX, Activity, Cpu, Zap, Lock, Globe, ArrowUpRight, 
  BarChart3, Eye, ChevronRight
} from 'lucide-react';
import { toPng } from 'html-to-image';

// محاكاة بيانات حقيقية من حساب WhaleWatchAlert
const MOCK_WHALE_DATA = [
  { id: 1, amount: "850,000", asset: "SOL", type: "Transfer", from: "Unknown", to: "Coinbase", time: "1m ago", usd: "127.5M" },
  { id: 2, amount: "2,500,000", asset: "USDC", type: "Mint", from: "Circle", to: "Whale_99", time: "4m ago", usd: "2.5M" },
  { id: 3, amount: "120,000", asset: "SOL", type: "Burn", from: "Raydium", to: "Null Address", time: "10m ago", usd: "18M" },
];

export default function WagmiWhaleProtocolFull() {
  // 1. States
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('scan'); // 'scan' or 'radar'
  const cardRef = useRef<HTMLDivElement>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);

  // 2. Audio Setup
  useEffect(() => {
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  // 3. Scanner Logic
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      let tierColor = "#22c55e"; // Default Green
      if (sol >= 1000) tierColor = "#3b82f6"; // White Whale Blue
      else if (sol >= 100) tierColor = "#8b5cf6"; // Shark Purple

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Invalid Wallet Address!");
    } finally {
      setLoading(false);
      if (scanSound.current) scanSound.current.pause();
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-PROTOCOL-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-blue-600">
      
      {/* --- BACKGROUND: SNOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            className="absolute w-[1.5px] h-[1.5px] bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]"
          />
        ))}
      </div>

      {/* --- SENKU AGENT (Mobile Optimized Size) --- */}
      <motion.div 
        className="fixed bottom-0 left-[-10%] md:left-4 z-50 pointer-events-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative group">
          <img 
            src="/senku.png" 
            alt="Senku"
            className="w-[180px] md:w-[350px] lg:w-[450px] h-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] filter contrast-125"
          />
        </div>
      </motion.div>

      {/* --- MUTE BUTTON --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-4 right-4 z-[60] p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-blue-500" />}
      </button>

      {/* --- NAVIGATION --- */}
      <div className="relative z-[70] flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-12 backdrop-blur-2xl">
        <button 
          onClick={() => setActiveTab('scan')} 
          className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all tracking-widest ${activeTab === 'scan' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
        >
          IDENTITY SCAN
        </button>
        <button 
          onClick={() => setActiveTab('radar')} 
          className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all tracking-widest ${activeTab === 'radar' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
        >
          WHALE RADAR
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {activeTab === 'scan' ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
            {/* LOGO */}
            <div className="text-center mb-10">
              <h1 className="text-6xl md:text-[11rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-2xl">
                WAGMI
              </h1>
              <p className="mt-2 text-[10px] md:text-sm font-mono tracking-[0.8em] text-blue-500 uppercase font-black italic">
                   WAGMI WHALE PROTOCOL
              </p>
            </div>

            {/* INPUT */}
            <div className="w-full max-w-md px-4 mb-12">
              <div className="relative p-[1px] rounded-2xl bg-white/10 focus-within:bg-blue-600 transition-all duration-500 shadow-2xl">
                <input 
                  className="w-full bg-black/90 rounded-2xl p-5 md:p-6 text-center outline-none font-mono text-sm md:text-lg text-white placeholder:text-white/20" 
                  placeholder="PASTE WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button 
                onClick={analyze} 
                className="w-full mt-4 py-5 md:py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? <Cpu className="animate-spin" size={16} /> : <Zap size={16} />} INITIATE SCAN
              </button>
            </div>

            {/* RESULT CARD */}
            <AnimatePresence>
              {data && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="w-full flex flex-col items-center pb-32 px-4"
                >
                  <div ref={cardRef} className="relative w-full max-w-[480px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20" style={{ backgroundColor: data.tierColor }} />
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                          <Fingerprint size={24} style={{ color: data.tierColor }} />
                        </div>
                        <p className="text-xl font-black italic leading-none tracking-tighter">WAGMI LEGACY</p>
                      </div>
                      <Radio size={20} className="text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter italic">{data.sol} <span className="text-xl font-black italic" style={{ color: data.tierColor }}>SOL</span></h2>
                      <p className="text-[10px] font-mono text-white/30 mt-2 tracking-widest uppercase">Global Node Verified</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 italic">Holder Rank</p>
                        <p className="text-3xl font-[1000] italic uppercase tracking-tighter" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <p className="text-[9px] font-mono text-white/20 tracking-tighter italic">ID_00{data.id}</p>
                    </div>
                  </div>
                  <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    SAVE ASSET <Download size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* --- LEADERBOARD / RADAR VIEW --- */
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-4 pb-40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-500 animate-spin-slow" size={32} />
                <h2 className="text-4xl md:text-5xl font-[1000] italic tracking-tighter">WHALE RADAR</h2>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full inline-flex items-center gap-2 self-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-blue-500 uppercase font-black tracking-widest">Live Signals Active</span>
              </div>
            </div>

            <div className="grid gap-4">
              {MOCK_WHALE_DATA.map((whale) => (
                <motion.div 
                  key={whale.id} 
                  whileHover={{ x: 5 }}
                  className="group relative bg-[#080808] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md"
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {whale.asset === 'SOL' ? <Activity size={28} /> : <BarChart3 size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-[1000] italic tracking-tighter">{whale.amount}</span>
                        <span className="text-sm font-black text-blue-500 italic mt-2">{whale.asset}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="px-2 py-[2px] bg-blue-500/10 text-blue-500 text-[8px] font-black rounded uppercase">{whale.type}</span>
                         <span className="text-[10px] font-mono text-white/30 uppercase italic">${whale.usd} VALUE</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col items-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/40 mb-2">
                      <span className="bg-white/5 px-2 py-1 rounded">FROM: {whale.from}</span>
                      <ChevronRight size={12} />
                      <span className="bg-white/5 px-2 py-1 rounded">TO: {whale.to}</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-500 italic tracking-widest uppercase">{whale.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DEEP ANALYSIS BANNER */}
            <div className="mt-12 p-10 border border-white/5 rounded-[3rem] bg-gradient-to-br from-blue-600/5 to-transparent text-center">
              <Eye className="mx-auto mb-4 text-blue-500 opacity-50" size={32} />
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[1em] mb-4">Deep Sea Analytics</p>
              <h3 className="text-2xl font-black italic tracking-tighter text-white/80">MARKET SENTIMENT: BULLISH ACCUMULATION</h3>
              <div className="mt-6 flex justify-center gap-2 h-1 w-full max-w-xs mx-auto">
                 {[...Array(10)].map((_, i) => <div key={i} className={`flex-1 rounded-full ${i < 8 ? 'bg-blue-600' : 'bg-white/10'}`} />)}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-20 text-[8px] md:text-[10px] font-mono tracking-[1.5em] uppercase text-center w-full select-none">
        WAGMI // BADER ALKORGLI // GLOBAL SOVEREIGN
      </footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinity; }
        body { background-color: #020202; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
