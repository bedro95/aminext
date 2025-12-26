"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Layers, Radio, Cpu, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiLaunchEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Analyze Function
  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(2),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) { 
      alert("Invalid Address. Ensure it's a valid Solana Public Key."); 
    } finally { 
      setLoading(false); 
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-PASS-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Error saving card."); }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-cyan-500">
      
      {/* --- CYBER SNOW / PARTICLES SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -10, x: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              y: "110vh", 
              opacity: [0, 0.8, 0],
              x: (Math.random() * 100 - 10) + "%" 
            }}
            transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10 
            }}
            className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]"
          />
        ))}
      </div>

      {/* --- BACKGROUND AMBIENT GLOW --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-12 md:mt-24">
        
        {/* --- SHARP WAGMI LOGO --- */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-16 md:mb-28">
          <h1 className="text-8xl md:text-[14rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.25)]">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[14px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-bold italic opacity-80">
            Secure Terminal v3.0
          </p>
        </motion.div>

        {/* --- INPUT AREA --- */}
        <div className="w-full max-w-lg mb-20 px-4 relative">
          <div className="relative p-[2px] rounded-full bg-gradient-to-r from-white/10 via-cyan-500/50 to-white/10 shadow-2xl overflow-hidden group">
            <input 
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-base md:text-lg text-white placeholder:text-white/20 transition-all focus:bg-[#050505]" 
              placeholder="ENTER SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading} 
            className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.4em] hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50"
          >
            {loading ? "SCANNING REALITY..." : "AUTHORIZE SCAN"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-16 w-full px-2">
              
              {/* --- THE ENHANCED ANIMATED NEON CARD --- */}
              <div className="relative w-full max-w-[600px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[5px] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] group">
                
                {/* RACING NEON LIGHTS */}
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)] opacity-100" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-14 overflow-hidden flex flex-col justify-between z-10 border border-white/5">
                  
                  {/* Internal Glow Fix */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                  
                  {/* Top Section */}
                  <div className="flex justify-between items-start relative z-20">
                    <div className="flex items-center gap-4 md:gap-8">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <Layers size={32} className="md:w-11 md:h-11 text-cyan-400 drop-shadow-[0_0_12px_#06b6d4]" />
                      </div>
                      <div className="text-left">
                        <p className="text-lg md:text-2xl font-black italic text-white uppercase tracking-tighter">Identity Pass</p>
                        <p className="text-[10px] md:text-[14px] font-mono text-cyan-400/50 uppercase font-bold">NODE: //SOL-00{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8 md:w-12 md:h-12 drop-shadow-[0_0_15px_#06b6d4]" />
                  </div>

                  {/* Wealth Content */}
                  <div className="flex items-center gap-8 md:gap-12 text-left relative z-20">
                    <div className="w-20 h-14 md:w-28 md:h-20 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 flex items-center justify-center">
                        <Cpu size={38} className="md:w-14 md:h-14 text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-6xl md:text-[6.5rem] font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] leading-none italic">
                          {data.sol}
                        </h2>
                        <p className="text-[10px] md:text-[14px] font-mono text-white/30 tracking-[0.6em] uppercase mt-3 font-bold italic">SOL_LIQUID_ASSETS</p>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-8 md:pt-12 relative z-20">
                    <div className="text-left">
                        <p className="text-[10px] md:text-[14px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 flex items-center gap-2">
                           <Sparkles size={14} /> ENCRYPTED_ACCESS
                        </p>
                        <p className="text-sm md:text-2xl font-black italic tracking-tight text-white/90">RANK: //{data.status}</p>
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} 
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-14 h-14 md:w-24 md:h-24 bg-cyan-400 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] border-4 border-white/20"
                    >
                        <Zap size={32} className="md:w-14 md:h-14 text-black" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={saveCard} 
                className="flex items-center gap-6 bg-white/5 border border-white/10 px-20 py-6 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.7em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 mb-24 group"
              >
                EXPORT IDENTITY <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- FOOTER --- */}
        <div className="pb-16 text-center opacity-30 hover:opacity-100 transition-opacity duration-500">
           <p className="text-[11px] font-mono tracking-[1.2em] uppercase">
             Crafted for <span className="text-white font-black">WAGMI</span> by <span className="text-cyan-400 font-black italic border-b-2 border-cyan-500">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        body { background-color: #020202; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }
      `}</style>
    </div>
  );
}