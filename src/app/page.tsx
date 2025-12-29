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

// بيانات تحاكي رادار الحيتان من حساب X
const MOCK_WHALE_DATA = [
  { id: 1, amount: "920,000", asset: "SOL", type: "Transfer", from: "Unknown", to: "Binance", time: "1m ago", usd: "138M" },
  { id: 2, amount: "5,000,000", asset: "USDC", type: "Mint", from: "Circle", to: "Whale_VIP", time: "3m ago", usd: "5M" },
  { id: 3, amount: "150,000", asset: "SOL", type: "Burn", from: "Jupiter", to: "Null", time: "8m ago", usd: "22.5M" },
];

export default function WagmiWhaleProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('scan'); 
  const cardRef = useRef<HTMLDivElement>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      let tierColor = "#3b82f6"; // Blue Neon
      if (sol >= 1000) tierColor = "#22c55e"; // Green Neon
      else if (sol >= 100) tierColor = "#a855f7"; // Purple

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 1000 ? "WHITE WHALE" : sol >= 100 ? "SOLANA SHARK" : "SURVIVOR",
        tierColor,
        id: Math.floor(100000 + Math.random() * 900000),
      });
    } catch (e) {
      alert("Invalid Address! Senku says: Check the data strings!");
    } finally {
      setLoading(false);
      if (scanSound.current) scanSound.current.pause();
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-CARD-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  // فقاعات تفكير Senku بناءً على الحالة
  const getSenkuTalk = () => {
    if (loading) return "Analyzing the deep ocean logic... 10 billion percent success rate!";
    if (data?.status === "WHITE WHALE") return "Incredible! A White Whale has emerged!";
    if (activeTab === 'radar') return "The radar is detecting massive energy shifts!";
    return "Science is the only way to the top. Let's scan!";
  };

  return (
    <div className="min-h-screen bg-[#010101] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-green-500">
      
      {/* --- SNOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 12 + 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            className="absolute w-[1.5px] h-[1.5px] bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]"
          />
        ))}
      </div>

      {/* --- INTERACTIVE SWIMMING SENKU --- */}
      <motion.div 
        className="fixed bottom-0 left-[-5%] md:left-4 z-50 pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          x: ["-5%", "2%", "-5%"],
          rotate: [-1, 1, -1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <img 
            src="/senku.png" 
            alt="Senku"
            className="w-[170px] md:w-[380px] h-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.3)] contrast-110"
          />
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-10 left-[60%] bg-black/80 border border-green-500/40 p-2 md:p-3 rounded-2xl rounded-bl-none text-[8px] md:text-[11px] font-mono text-green-400 max-w-[120px] md:max-w-[200px] backdrop-blur-md"
          >
            {getSenkuTalk()}
          </motion.div>
        </div>
      </motion.div>

      {/* --- CONTROLS --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-5 right-5 z-[60] p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-lg"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-green-400" />}
      </button>

      {/* --- NAV TABS --- */}
      <div className="relative z-[70] flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-12 backdrop-blur-xl">
        {['scan', 'radar'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all tracking-[0.2em] uppercase ${activeTab === tab ? 'bg-green-600 text-white' : 'text-white/30 hover:text-white'}`}
          >
            {tab === 'scan' ? 'Identity Scan' : 'Whale Radar'}
          </button>
        ))}
      </div>

      {/* --- MAIN UI --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {activeTab === 'scan' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-7xl md:text-[12rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-2xl">
                WAGMI
              </h1>
              <p className="mt-2 text-[10px] md:text-sm font-mono tracking-[1em] text-green-500 uppercase font-black italic">
                   WAGMI WHALE PROTOCOL
              </p>
            </div>

            <div className="w-full max-w-md px-4 mb-12">
              <div className="relative p-[1px] rounded-2xl bg-white/10 focus-within:bg-green-600 transition-all duration-500 shadow-2xl">
                <input 
                  className="w-full bg-black/90 rounded-2xl p-5 md:p-6 text-center outline-none font-mono text-sm text-white placeholder:text-white/10" 
                  placeholder="SOLANA_WALLET_ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button 
                onClick={analyze} 
                className="w-full mt-4 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? <Cpu className="animate-spin" size={16} /> : <Zap size={16} />} INITIATE_ANALYSIS
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center pb-32 px-4">
                  <div ref={cardRef} className="relative w-full max-w-[460px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-20" style={{ backgroundColor: data.tierColor }} />
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-4">
                        <Fingerprint size={28} style={{ color: data.tierColor }} />
                        <p className="text-xl font-black italic tracking-tighter">PROTOCOL_ASSET</p>
                      </div>
                      <Radio size={20} className="text-green-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter italic">{data.sol} <span className="text-xl font-black" style={{ color: data.tierColor }}>SOL</span></h2>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6 z-10">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-30 italic">Security Level</p>
                        <p className="text-3xl font-[1000] italic uppercase tracking-tighter" style={{ color: data.tierColor }}>{data.status}</p>
                      </div>
                      <p className="text-[9px] font-mono text-white/20">NODE_ID_{data.id}</p>
                    </div>
                  </div>
                  <button onClick={saveCard} className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    SAVE DIGITAL ASSET <Download size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full px-4 pb-40">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <Globe className="text-green-500 animate-spin-slow" size={30} />
                <h2 className="text-3xl md:text-5xl font-[1000] italic tracking-tighter uppercase">Whale Radar</h2>
              </div>
              <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 font-black animate-pulse">LIVE FEED</span>
            </div>

            <div className="grid gap-4">
              {MOCK_WHALE_DATA.map((whale) => (
                <motion.div 
                  key={whale.id} 
                  whileHover={{ x: 8 }}
                  className="group bg-[#080808] border border-white/10 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md"
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-green-400 border border-white/5 group-hover:bg-green-600 group-hover:text-white transition-all">
                      {whale.asset === 'SOL' ? <Activity size={26} /> : <BarChart3 size={26} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl md:text-4xl font-[1000] italic tracking-tighter">{whale.amount}</span>
                        <span className="text-sm font-black text-green-500 italic mt-2">{whale.asset}</span>
                      </div>
                      <p className="text-[10px] font-mono text-white/30 uppercase italic">${whale.usd} NET VALUE</p>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex flex-col items-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 mb-2">
                      <span className="bg-white/5 px-2 py-1 rounded">FROM: {whale.from}</span>
                      <ChevronRight size={10} />
                      <span className="bg-white/5 px-2 py-1 rounded">TO: {whale.to}</span>
                    </div>
                    <span className="text-[10px] font-black text-green-400 italic tracking-widest">{whale.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-10 border border-white/5 rounded-[3.5rem] bg-gradient-to-br from-green-600/5 to-transparent text-center">
              <Eye className="mx-auto mb-4 text-green-500/50" size={32} />
              <h3 className="text-2xl font-black italic tracking-tighter text-white/80 uppercase">Sentiment: Massive Accumulation</h3>
              <p className="text-[9px] font-mono text-white/20 mt-2 uppercase tracking-[0.5em]">The ocean is cold, but the science is hot</p>
            </div>
          </motion.div>
        )}
      </div>

      <footer className="mt-auto py-12 opacity-20 text-[8px] md:text-[10px] font-mono tracking-[1.5em] uppercase text-center w-full select-none">
        WAGMI // BADER ALKORGLI // KINGDOM OF SCIENCE
      </footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinity; }
        body { background-color: #010101; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
