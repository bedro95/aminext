"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

// مصفوفة الأيقونات المنبثقة
const ECOSYSTEM_ICONS = [
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFW36DP7btR2GrS1W86WH7AfB7rqnCYcV5as67vS5/logo.png", // USDC
  "https://jup.ag/svg/jupiter-logo.svg", // Jupiter
  "https://raydium.io/logo/logo-only-light.svg", // Raydium
  "https://pyth.network/favicon.ico", // Pyth
  "https://www.tensor.trade/favicon.ico", // Tensor
];

export default function WagmiSuperNovaTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleScan = async () => {
    if (!address || address.length < 32) {
      alert("Please enter a valid Solana address");
      return;
    }
    setLoading(true);
    setData(null); 
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key).catch(() => 0);
      const sol = balance / 1_000_000_000;
      let currentStatus = sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER";
      
      const resData = { sol: sol.toFixed(2), status: currentStatus, asset: "SOL", id: Math.floor(1000 + Math.random() * 9000) };
      setData(resData);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    } catch (e) { alert("Scan Error. Please try again."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-[#c7f284] overflow-x-hidden">
      
      {/* --- BACKGROUND ENGINE --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#c7f284]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#212121]/50 blur-[180px] rounded-full animate-pulse" />
      </motion.div>

      {/* --- JUPITER CORE & ECOSYSTEM FOUNTAIN --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-80 pointer-events-none hidden lg:block">
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-72 h-72 flex items-center justify-center"
        >
          {/* Neon Glow Background */}
          <div className="absolute inset-0 bg-[#c7f284]/20 rounded-full blur-[80px] animate-pulse" />
          
          {/* Black Circle Container (The Core) */}
          <div className="relative w-full h-full bg-black rounded-full border border-[#c7f284]/20 shadow-[0_0_100px_rgba(199,242,132,0.1)] flex items-center justify-center p-12 overflow-hidden">
             {/* Official Jupiter SVG Logo */}
             <svg viewBox="0 0 100 100" className="w-full h-full text-[#c7f284] drop-shadow-[0_0_20px_rgba(199,242,132,0.8)]">
               <path fill="currentColor" d="M50 0c27.614 0 50 22.386 50 50S77.614 100 50 100 0 77.614 0 50 22.386 0 50 0zm0 15c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 10c13.807 0 25 11.193 25 25S63.807 75 50 75 25 63.807 25 50s11.193-25 25-25z" opacity=".2"/>
               <path fill="currentColor" d="M50 20c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30zm0 10c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z"/>
               <circle cx="50" cy="50" r="12" fill="currentColor"/>
             </svg>
          </div>

          {/* Ecosystem Fountain Bubbles */}
          {ECOSYSTEM_ICONS.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.3, 0.7, 0.3],
                x: [0, (i % 2 === 0 ? 1 : -1) * (180 + Math.random() * 100)],
                y: [0, -300 - Math.random() * 200],
              }}
              transition={{ duration: 7, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="p-2 bg-black/80 backdrop-blur-md rounded-full border border-[#c7f284]/10 shadow-lg">
                <img src={icon} className="w-10 h-10 rounded-full" alt="eco" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent drop-shadow-2xl select-none">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-[#c7f284] uppercase mt-4 font-black italic mb-16">
            NEURAL TERMINAL v3.2
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c7f284] to-[#14F195] rounded-full blur opacity-20 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER SOLANA ADDRESS" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <button 
            onClick={handleScan} 
            disabled={loading} 
            className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-[#c7f284] hover:text-black transition-all active:scale-95 shadow-xl"
          >
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT SECTION --- */}
      <AnimatePresence>
        {data && (
          <section ref={resultRef} id="result-view" className="relative z-10 py-32 flex flex-col items-center px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-[640px]">
              <div ref={cardRef} className="relative w-full aspect-[1.58/1] rounded-[3rem] p-10 border border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#c7f284]/5 to-transparent" />
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Layers className="text-[#c7f284]" />
                        <span className="text-xl font-black italic uppercase tracking-tighter text-white">Jupiter Identity</span>
                      </div>
                      <Radio className="text-[#c7f284] animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter text-white leading-none">{data.sol}</h2>
                      <p className="text-xs font-mono text-[#c7f284]/60 mt-2 uppercase tracking-[0.3em]">RESERVE_ASSET: SOLANA</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-6">
                      <div className="text-left">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-1 tracking-widest">RANK STATUS</p>
                        <p className="text-2xl font-black italic text-white uppercase">{data.status}</p>
                      </div>
                      <div className="w-14 h-14 bg-[#c7f284] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(199,242,132,0.5)]">
                        <Zap className="text-black" fill="currentColor" size={28} />
                      </div>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l=document.createElement('a'); l.download='WAGMI-JUP-PASS.png'; l.href=url; l.click(); })} 
                className="mt-8 w-full py-5 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-full font-black text-xs uppercase tracking-widest transition-all"
              >
                Download Jupiter Pass <Download size={16} className="inline ml-2" />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-20 px-6 border-t border-white/5 text-center">
        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">WAGMI PULSE</h2>
        <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-[0.5em]">Designed by <span className="text-[#c7f284] font-bold underline">Bader Alkorgli</span></p>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #c7f284; border-radius: 10px; }
      `}</style>
    </div>
  );
}