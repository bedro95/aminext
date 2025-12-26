"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, Radio, ShieldCheck, Fingerprint, Volume2, VolumeX, Github, Zap, Atom } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiLegendaryEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Audio References
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    successSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  const playSound = (sound: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (!isMuted && sound.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(() => {});
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString()
      });
      if (scanSound.current) scanSound.current.pause();
      playSound(successSound);
    } catch (e) { 
      if (scanSound.current) scanSound.current.pause();
      alert("Invalid Address."); 
    } finally { setLoading(false); }
  };

  const saveCard = async () => {
    playSound(clickSound);
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Error saving card."); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-cyan-500">
      
      {/* --- THE MASTER AGENT LAYER (ULTRA TECH) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         {/* Moving Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- SENKU: THE INTERACTIVE ENTITY --- */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="fixed bottom-10 left-10 z-50 hidden lg:block cursor-grab active:cursor-grabbing"
      >
        <div className="relative group">
          {/* Neural Network Circles Around Agent */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-20 border border-cyan-500/10 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -inset-10 border border-purple-500/10 rounded-full" />
          
          <motion.div
            animate={loading ? { 
                scale: [1, 1.05, 1],
                filter: ["drop-shadow(0 0 20px #06b6d4)", "drop-shadow(0 0 50px #a855f7)", "drop-shadow(0 0 20px #06b6d4)"]
            } : { y: [0, -15, 0] }}
            transition={{ duration: loading ? 0.3 : 4, repeat: Infinity }}
            className="relative"
          >
            {/* Dr. Stone Avatar with Cyber Layer */}
            <div className="relative">
                <img 
                    src="https://www.pngarts.com/files/12/Senku-Ishigami-Dr.-Stone-PNG-Photo.png" 
                    alt="Digital Senku"
                    className="w-64 h-auto z-10 relative brightness-110 contrast-125"
                />
                <Atom className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-cyan-500/20 ${loading ? 'animate-spin' : ''}`} size={200} />
            </div>

            {/* AI Interaction Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 border border-white/10 px-4 py-1 rounded-full backdrop-blur-xl">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-purple-500 animate-ping' : 'bg-cyan-500 animate-pulse'}`} />
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                    {loading ? "Processing Data" : "System Guardian"}
                </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- UI CONTROLS --- */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-6 right-6 z-50 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-cyan-400" />}
      </button>

      {/* LOGO & MAIN INTERFACE */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-20">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-8xl md:text-[14rem] font-[1000] italic tracking-tighter leading-none text-white select-none">
            WAGMI
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
             <div className="h-[1px] w-12 bg-cyan-500/50" />
             <p className="text-[10px] md:text-[12px] font-mono tracking-[1em] text-cyan-400 uppercase italic">Scientific Evolution</p>
             <div className="h-[1px] w-12 bg-cyan-500/50" />
          </div>
        </motion.div>

        {/* INPUT PANEL */}
        <div className="w-full max-w-lg mb-20 px-4 relative z-20">
          <div className="group relative p-[2px] rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 transition-all duration-1000">
            <input 
              onMouseEnter={() => playSound(hoverSound)}
              className="w-full bg-black rounded-full p-7 text-center outline-none font-mono text-lg text-white placeholder:text-white/10 border border-white/5 group-hover:border-transparent transition-all" 
              placeholder="PASTE WALLET SIGNATURE"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onMouseEnter={() => playSound(hoverSound)}
            onClick={() => { playSound(clickSound); analyze(); }} 
            disabled={loading} 
            className="w-full mt-8 py-6 bg-white text-black rounded-full font-[1000] uppercase text-lg tracking-[0.5em] hover:invert transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-4"
          >
            {loading ? <><Zap className="animate-bounce" /> ANALYZING...</> : "INITIATE PROTOCOL"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-16 w-full px-2 relative z-20">
              
              {/* THE MASTERPIECE CARD */}
              <div className="relative w-full max-w-[640px] aspect-[1.58/1] rounded-[4rem] p-[4px] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)]">
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[3.8rem] p-10 md:p-16 overflow-hidden flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)]">
                        <Fingerprint size={40} className="md:w-14 md:h-14 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-2xl md:text-4xl font-[1000] italic text-white uppercase tracking-tighter">Wagmi Legacy</p>
                        <p className="text-[10px] md:text-[14px] font-mono text-white/20 tracking-[0.3em] uppercase">Neural Identity Card</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-10 h-10" />
                  </div>

                  <div className="flex items-center gap-6 text-left">
                    <h2 className="text-7xl md:text-[8.5rem] font-[1000] tracking-tighter text-white italic leading-none">{data.sol}</h2>
                    <span className="text-2xl md:text-4xl font-black text-cyan-400 italic mb-4">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-10">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-3">
                           <ShieldCheck size={20} className="text-cyan-400" />
                           <p className="text-[10px] md:text-[14px] font-black text-cyan-400 uppercase tracking-widest italic">Protocol: Verified</p>
                        </div>
                        <p className="text-xl md:text-3xl font-[1000] italic text-white/90 uppercase tracking-tight">{data.status}</p>
                    </div>
                    <p className="text-[12px] font-mono text-white/30 uppercase italic">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onMouseEnter={() => playSound(hoverSound)}
                onClick={saveCard} 
                className="group flex items-center gap-8 bg-white/5 border border-white/10 px-28 py-8 rounded-full font-[1000] text-sm uppercase tracking-[1em] hover:bg-white hover:text-black transition-all"
              >
                SAVE TO VAULT <Download size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 pb-20 flex flex-col items-center gap-10 opacity-20 hover:opacity-100 transition-all duration-700">
          <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="p-5 bg-white/5 rounded-full border border-white/10 hover:border-cyan-500 hover:scale-110 transition-all">
            <Github size={32} />
          </a>
          <div className="text-center">
            <p className="text-[10px] font-mono tracking-[2em] uppercase text-white/50">WAGMI PROTOCOL // BADER ALKORGLI</p>
            <p className="text-[8px] font-mono text-cyan-500/50 mt-4 tracking-widest italic font-bold">POWERED BY SOLANA NEURAL NET</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}