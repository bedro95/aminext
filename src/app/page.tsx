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
  Cpu 
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiFinalSovereign() {
  // 1. State Management
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 2. Audio References
  const scanSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  // 3. Analysis Logic
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
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "SCIENTIST LEVEL" : "WAGMI SURVIVOR",
        id: Math.floor(100000 + Math.random() * 900000),
      });

      if (scanSound.current) scanSound.current.pause();
    } catch (e) {
      if (scanSound.current) scanSound.current.pause();
      alert("Invalid Wallet Address!");
    } finally {
      setLoading(false);
    }
  };

  // 4. Save Image Logic
  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3,
        backgroundColor: '#000',
        style: { borderRadius: '3.5rem' }
      });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Error generating image.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-green-500 selection:text-black">
      
      {/* --- BACKGROUND: SNOW SYSTEM (Original) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10 
            }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        ))}
      </div>

      {/* --- CHARACTER: SENKU AGENT (Responsive & Interactive) --- */}
      <motion.div 
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        className="fixed bottom-0 left-[-15%] md:left-0 z-50 pointer-events-auto"
      >
        <div className="relative flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 w-40 h-40 md:w-96 md:h-96 bg-green-500/20 blur-[100px] rounded-full"
          />
          <motion.div
            animate={loading ? { y: [0, -30, 0], filter: "brightness(1.5)" } : { y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src="/senku.png" 
              alt="Senku Agent"
              className="w-[240px] md:w-[500px] lg:w-[600px] h-auto drop-shadow-[0_0_50px_rgba(34,197,94,0.4)] select-none pointer-events-none"
            />
            {/* Status Tag */}
            <div className="absolute top-[30%] right-[10%] bg-black/80 border border-green-500/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                <Activity size={10} className="text-green-500 animate-pulse" />
                <span className="text-[8px] font-mono text-green-400 font-bold uppercase tracking-tighter">
                    {loading ? "SCANNING" : "ACTIVE"}
                </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- CONTROLS: MUTE BUTTON --- */}
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-6 right-6 z-[60] p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-green-400" />}
      </button>

      {/* --- MAIN UI --- */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-12 md:mt-24">
        
        {/* BIG LOGO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12 md:mb-24">
          <h1 className="text-7xl md:text-[16rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-2xl select-none">
            WAGMI
          </h1>
          <p className="mt-4 text-[10px] md:text-[18px] font-mono tracking-[1.2em] text-green-400 uppercase font-black italic pl-[1.2em]">
               KINGDOM OF SCIENCE
          </p>
        </motion.div>

        {/* INPUT SECTION */}
        <div className="w-full max-w-lg mb-16 md:mb-24 px-4 relative z-20">
          <div className="relative p-[1px] rounded-full bg-white/10 focus-within:bg-green-500 transition-all duration-500 shadow-2xl">
            <input 
              className="w-full bg-black rounded-full p-6 md:p-8 text-center outline-none font-mono text-base md:text-xl text-white placeholder:text-white/20" 
              placeholder="PASTE WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading}
            className="w-full mt-6 py-6 md:py-7 bg-white text-black rounded-full font-[1000] uppercase text-sm md:text-xl tracking-[0.5em] hover:bg-green-400 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4"
          >
            {loading ? <><Cpu className="animate-spin" /> ANALYZING</> : "INITIATE SCAN"}
          </button>
        </div>

        {/* WAGMI CARD SECTION */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="w-full flex flex-col items-center gap-10 md:gap-16 pb-32 relative z-20"
            >
              <div className="relative w-full max-w-[620px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[4rem] p-[3px] overflow-hidden shadow-2xl">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#22c55e,#3b82f6,#22c55e,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.9rem] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-4 md:gap-8">
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Fingerprint size={32} className="text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xl md:text-3xl font-[1000] italic text-white uppercase leading-none">Wagmi Legacy</p>
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest italic">Node Verified</p>
                      </div>
                    </div>
                    <Radio className="text-green-500 animate-pulse w-6 h-6 md:w-10 md:h-10" />
                  </div>

                  <div className="flex items-center gap-4 text-left relative z-10">
                    <h2 className="text-6xl md:text-9xl font-[1000] tracking-tighter text-white italic">{data.sol}</h2>
                    <span className="text-xl md:text-3xl font-black text-green-400 italic mb-4 uppercase">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-6 md:pt-10 relative z-10">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck size={16} className="text-green-400" />
                           <p className="text-[10px] font-black text-green-400 uppercase tracking-widest italic">Identity Secured</p>
                        </div>
                        <p className="text-2xl md:text-4xl font-[1000] italic text-white/95 uppercase tracking-tight">{data.status}</p>
                    </div>
                    <p className="text-[10px] font-mono text-white/20 italic">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={saveCard} 
                className="flex items-center gap-6 bg-white/5 border border-white/10 px-16 md:px-24 py-5 md:py-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all shadow-2xl"
              >
                SAVE ASSET <Download size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="mt-auto py-12 opacity-30 text-[10px] font-mono tracking-[2em] uppercase text-center w-full select-none">
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