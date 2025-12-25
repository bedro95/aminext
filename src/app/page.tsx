"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiMobilePerfectEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(1),
        status: sol >= 100 ? "SOLANA PRO" : "HODLER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) { alert("Invalid Address"); } finally { setLoading(false); }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-MOBILE-PASS.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative">
      
      {/* --- ULTRA SIDE NEON LIGHTS (STRENGTHENED) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-30%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-cyan-600/30 blur-[150px] md:blur-[250px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1.1, 0.9, 1.1] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[-10%] right-[-30%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-purple-700/30 blur-[150px] md:blur-[250px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-6 md:mt-12">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-6xl md:text-[11rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">WAGMI</h1>
          <p className="text-[9px] md:text-[11px] font-mono tracking-[1em] md:tracking-[1.5em] text-cyan-400 uppercase mb-12 md:20 font-black italic text-center">Neural Terminal v2.0</p>
        </motion.div>

        {/* Search Module - Optimized for Mobile */}
        <div className="w-full max-w-md mb-16 md:mb-24 space-y-4 px-4">
            <div className="relative p-[1px] rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <input 
                  className="w-full bg-[#050505] rounded-full p-5 md:p-7 text-center outline-none font-mono text-sm md:text-xl border border-white/5 focus:border-cyan-400 transition-all text-white" 
                  placeholder="ENTER WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={analyze} disabled={loading} className="w-full py-5 md:py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-xl tracking-widest hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all active:scale-95">
               {loading ? "SCANNING..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-10 md:gap-16 w-full px-2">
              
              {/* --- THE MOBILE-PERFECT DUAL-NEON CARD --- */}
              <div 
                ref={cardRef} 
                className="relative w-full max-w-[560px] aspect-[1.58/1] bg-[#050505] rounded-[1.8rem] md:rounded-[2.8rem] p-5 md:p-10 overflow-hidden border transition-all"
                style={{ 
                  boxShadow: '0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 30px rgba(6, 182, 212, 0.1)' 
                }}
              >
                {/* Dynamic Dual Neon Border Pulse */}
                <motion.div 
                   animate={{ borderColor: ['rgba(6,182,212,0.8)', 'rgba(168,85,247,0.8)', 'rgba(6,182,212,0.8)'] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute inset-0 border-[2px] md:border-[4px] rounded-[1.8rem] md:rounded-[2.8rem] pointer-events-none z-20"
                />

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '20px 20px' }} />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 md:gap-5">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-cyan-400/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-cyan-400/30">
                        <Layers size={20} className="md:w-8 md:h-8 text-cyan-400" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xs md:text-lg font-black italic text-white uppercase tracking-tight">Identity Pass</p>
                        <p className="text-[8px] md:text-[11px] font-mono text-cyan-400/70 mt-1 italic uppercase">ID: //SOL-{data.id} * TERMINAL//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-5 h-5 md:w-10 md:h-10" />
                  </div>

                  {/* Middle Section */}
                  <div className="flex items-center gap-4 md:gap-10 text-left">
                    <div className="w-12 h-9 md:w-20 md:h-14 bg-[#111] rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden">
                        <CreditCard size={20} className="md:w-9 md:h-9 text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-7xl font-black tracking-tighter text-white leading-none">{data.sol}</h2>
                        <p className="text-[8px] md:text-[11px] font-mono text-white/30 tracking-[0.4em] uppercase mt-1 md:mt-2 font-bold">SOL_LIQUID_ASSET</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-4 md:pt-8">
                    <div className="text-left">
                        <p className="text-[8px] md:text-[11px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">SYSTEM_VERIFIED</p>
                        <p className="text-[10px] md:text-sm font-black italic tracking-tight text-white/90 uppercase">CLASS: {data.status}</p>
                    </div>
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-cyan-400 rounded-xl md:rounded-3xl flex items-center justify-center shadow-[0_0_30px_#06b6d4]">
                        <Zap size={20} className="md:w-8 md:h-8 text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button onClick={saveCard} className="flex items-center gap-4 bg-cyan-400 text-black px-12 md:px-20 py-4 md:py-7 rounded-2xl md:rounded-[2.5rem] font-black text-[10px] md:text-sm uppercase tracking-[0.5em] hover:shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all active:scale-95 mb-10">
                EXPORT ID <Download size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}