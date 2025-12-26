"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  Zap
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiNeonSovereign() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // مراجع الصوت
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

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 10 ? "SCIENTIST LEVEL" : "WAGMI SURVIVOR",
        id: Math.floor(100000 + Math.random() * 900000),
      });

      if (scanSound.current) scanSound.current.pause();
    } catch (e) {
      if (scanSound.current) scanSound.current.pause();
      alert("Address Error!");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-NEON-${data?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-purple-500">
      
      {/* 1. نظام تساقط الثلج (Original Snow) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 0.8, 0] }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1.2px] h-[1.2px] bg-white rounded-full shadow-[0_0_5px_#fff]"
          />
        ))}
      </div>

      {/* 2. شخصية Senku التفاعلية (من ملف public/senku.png) */}
      <motion.div 
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        className="fixed bottom-0 left-[-15%] md:left-0 z-50 pointer-events-auto"
      >
        <div className="relative">
          {/* هالة نيون بنفسجية وسماوية خلف الشخصية */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-10 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-tr from-purple-600/30 to-cyan-400/30 blur-[100px] rounded-full"
          />
          <motion.img 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="/senku.png" 
            alt="Senku Agent"
            className="w-[280px] md:w-[580px] h-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.4)] select-none pointer-events-none"
          />
        </div>
      </motion.div>

      {/* 3. الواجهة الرئيسية */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-12 md:mt-20">
        
        <header className="text-center mb-12 md:mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[16rem] font-[1000] italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-purple-500 drop-shadow-[0_0_50px_rgba(168,85,247,0.3)]"
          >
            WAGMI
          </motion.h1>
          <p className="mt-4 text-[10px] md:text-sm font-mono tracking-[1.2em] text-cyan-400 uppercase font-black italic pl-[1.2em]">
               NEON KINGDOM OF SCIENCE
          </p>
        </header>

        {/* حقل الإدخال بتصميم نيون */}
        <div className="w-full max-w-md mb-12 px-4 relative z-20 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative">
            <input 
              className="w-full bg-black border border-white/10 rounded-full p-6 md:p-8 text-center outline-none font-mono text-white focus:border-cyan-500 transition-all shadow-2xl"
              placeholder="PASTE WALLET SIGNATURE"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading}
            className="w-full mt-6 py-6 md:py-7 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-[1000] uppercase text-sm md:text-lg tracking-[0.5em] hover:scale-[1.02] transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3"
          >
            {loading ? <Cpu className="animate-spin" /> : <Zap size={20} />}
            {loading ? "ANALYZING..." : "INITIATE SCAN"}
          </button>
        </div>

        {/* كرت النتائج (النيون المطور) */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 50, opacity: 0, rotateX: 20 }} 
              animate={{ y: 0, opacity: 1, rotateX: 0 }} 
              className="w-full flex flex-col items-center gap-12 pb-32 relative z-20 px-2"
            >
              <div className="relative w-full max-w-[620px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[4rem] p-[3px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)]">
                {/* إطار النيون المتحرك بنفسجي وسماوي */}
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#a855f7,#06b6d4,#a855f7,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.9rem] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                        <Fingerprint size={32} className="text-cyan-400" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xl md:text-3xl font-[1000] italic text-white uppercase">Wagmi Legacy</p>
                        <p className="text-[8px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest italic">NEON AUTHENTICATION</p>
                      </div>
                    </div>
                    <Radio className="text-purple-500 animate-pulse w-6 h-6 md:w-10 md:h-10" />
                  </div>

                  <div className="flex items-center gap-4 text-left">
                    <h2 className="text-6xl md:text-[9rem] font-[1000] tracking-tighter italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">{data.sol}</h2>
                    <span className="text-xl md:text-3xl font-black text-cyan-400 italic mb-4 uppercase">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-6 md:pt-10">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck size={18} className="text-purple-400" />
                           <p className="text-[10px] font-black text-purple-400 uppercase italic tracking-widest">Protocol Secured</p>
                        </div>
                        <p className="text-2xl md:text-4xl font-[1000] italic text-white/95 uppercase tracking-tight">{data.status}</p>
                    </div>
                    <p className="text-[10px] font-mono text-white/20 italic uppercase tracking-widest">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={saveCard} 
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-16 md:px-24 py-5 md:py-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all group"
              >
                SAVE DATA <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-auto py-12 opacity-30 text-[10px] font-mono tracking-[2em] uppercase text-center w-full select-none text-white/50">
          WAGMI // BADER ALKORGLI
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}