"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Radio, 
  ShieldCheck, 
  Fingerprint, 
  Volume2, 
  VolumeX, 
  Activity, 
  Cpu,
  TrendingUp,
  Waves
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiWhiteWhaleSovereign() {
  // 1. State Management
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // 2. Audio & Data Fetching
  const scanSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;

    // جلب سعر سولانا الحقيقي لتعزيز دقة التحليل
    fetch('https://api.dexscreener.com/latest/dex/pairs/solana/8s9616asdfg...') // مثال للـ API
      .then(res => res.json())
      .then(d => setSolPrice(d.pair?.priceUsd || 150)) 
      .catch(() => setSolPrice(150));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Analysis Logic (The White Whale Algorithm)
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      const usdValue = solAmount * solPrice;

      let status = "WAGMI SURVIVOR";
      let rank = "PLANKTON";
      if (solAmount >= 1000) { status = "WHITE WHALE"; rank = "GOD-TIER"; }
      else if (solAmount >= 100) { status = "SOLANA SHARK"; rank = "PREDATOR"; }
      else if (solAmount >= 10) { status = "SCIENTIST"; rank = "ELITE"; }

      setData({
        sol: solAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        usd: usdValue.toLocaleString(undefined, { maximumFractionDigits: 0 }),
        status,
        rank,
        id: Math.floor(100000 + Math.random() * 900000),
      });

      if (scanSound.current) scanSound.current.pause();
    } catch (e) {
      if (scanSound.current) scanSound.current.pause();
      alert("Address error. Senku says: Check your logic!");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-WHALE-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-hidden relative selection:bg-blue-500">
      
      {/* --- ADVANCED SNOW/SEA PARTICLES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: ["-10vh", "110vh"],
              x: [Math.random() * 100 + "vw", (Math.random() * 100 + 5) + "vw"],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[2px] h-[2px] bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* --- SENKU AGENT WITH DYNAMIC THOUGHTS --- */}
      <motion.div className="fixed bottom-0 left-[-10%] md:left-0 z-50">
        <div className="relative">
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="absolute -top-20 left-40 bg-white/10 backdrop-blur-xl border border-blue-500/30 p-4 rounded-2xl rounded-bl-none"
              >
                <p className="text-blue-400 font-mono text-[10px] animate-pulse">ESTIMATING LIQUIDITY... 10,000,000% CERTAIN!</p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.img 
            src="/senku.png" 
            animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-[300px] md:w-[550px] drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          />
        </div>
      </motion.div>

      {/* --- MUTE & STATUS --- */}
      <div className="fixed top-6 right-6 z-[60] flex gap-4">
        <div className="hidden md:flex flex-col items-end justify-center px-4 border-r border-white/10">
          <span className="text-[10px] text-white/40 font-mono">SOL PRICE</span>
          <span className="text-green-400 font-bold">${solPrice}</span>
        </div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-blue-400" />}
        </button>
      </div>

      {/* --- MAIN UI --- */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mt-10 mb-16">
          <h1 className="text-8xl md:text-[14rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
            WAGMI
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-12 bg-blue-500/50" />
            <p className="text-[10px] md:text-sm font-mono tracking-[1em] text-blue-400 uppercase font-black">
               White Whale Protocol
            </p>
            <div className="h-[1px] w-12 bg-blue-500/50" />
          </div>
        </motion.div>

        {/* INPUT SECTION */}
        <div className="w-full max-w-xl px-4 relative z-20">
          <div className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 to-green-500/20 hover:from-blue-500 hover:to-green-500 transition-all duration-700">
            <input 
              className="w-full bg-[#080808] rounded-2xl p-6 md:p-8 text-center outline-none font-mono text-lg text-white placeholder:text-white/10" 
              placeholder="ENTER WALLET SIGNATURE"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading}
            className="w-full mt-6 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase text-sm tracking-[0.4em] hover:bg-white hover:text-black transition-all active:scale-95 flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            {loading ? <><Activity className="animate-spin" /> SCANNING DEEP SEA</> : "VERIFY IDENTITY"}
          </button>
        </div>

        {/* --- DYNAMIC WHITE WHALE CARD --- */}
        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-20 pb-40">
              <div ref={cardRef} className="relative w-[350px] md:w-[600px] aspect-[1.6/1] bg-[#050505] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden group">
                {/* Card Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all" />
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                      <Waves className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black italic tracking-tighter">WAGMI LEGACY</h3>
                      <p className="text-[10px] font-mono text-blue-400/50 uppercase">{data.rank} ACCESS</p>
                    </div>
                  </div>
                  <Radio size={24} className="text-green-500 animate-pulse" />
                </div>

                <div className="my-4">
                  <div className="flex items-end gap-3">
                    <span className="text-7xl md:text-8xl font-[1000] italic tracking-tighter">{data.sol}</span>
                    <span className="text-2xl font-black text-blue-500 italic pb-4">SOL</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 font-mono text-sm">
                    <TrendingUp size={14} />
                    <span>≈ ${data.usd} USD</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                  <div>
                    <p className="text-[10px] font-mono text-white/30 uppercase mb-1">Holder Classification</p>
                    <p className="text-3xl font-[1000] italic text-green-400 uppercase tracking-tight">{data.status}</p>
                  </div>
                  <div className="text-right">
                    <Fingerprint className="text-white/20 mb-2 ml-auto" />
                    <p className="text-[10px] font-mono text-white/20">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={saveCard}
                className="mt-10 mx-auto flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl"
              >
                DOWNLOAD ASSET <Download size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-6 w-full text-center opacity-20 text-[8px] font-mono tracking-[2em] uppercase pointer-events-none">
        Developed by Bader Alkorgli // Kingdom of Science
      </footer>

      <style jsx global>{`
        body { background-color: #02040a; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
