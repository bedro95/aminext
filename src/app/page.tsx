"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio, Cpu } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiLogoCorrectedEdition() {
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
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3, 
        backgroundColor: '#000',
        cacheBust: true 
      });
      const link = document.createElement('a');
      link.download = `WAGMI-IDENTITY-PASS.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Error saving card.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden selection:bg-cyan-500">
      
      {/* --- EXTREME NEON BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-15%] w-[100vw] h-[600px] bg-cyan-600/25 blur-[180px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-15%] w-[100vw] h-[600px] bg-purple-700/25 blur-[180px] rounded-full mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-10 md:mt-24">
        {/* --- CORRECTED LOGO SECTION --- */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-16 md:mb-24">
          <h1 className="text-8xl md:text-[13rem] font-[1000] italic tracking-tight leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            WAGMI
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2 shadow-[0_0_15px_#06b6d4]" />
          <p className="text-[10px] md:text-[13px] font-mono tracking-[1.4em] text-cyan-400 uppercase mt-4 font-black italic">Neural Terminal 2025</p>
        </motion.div>

        {/* Input UI */}
        <div className="w-full max-w-lg mb-20 px-4">
          <div className="relative p-[1.5px] rounded-full bg-white/10 focus-within:bg-cyan-500 transition-all duration-500 shadow-2xl overflow-hidden">
            <input 
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-base md:text-lg text-white" 
              placeholder="ENTER SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading} 
            className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.4em] hover:bg-cyan-400 hover:text-white transition-all shadow-xl active:scale-95"
          >
            {loading ? "INITIALIZING SCAN..." : "SCAN IDENTITY"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-14 w-full px-2">
              
              {/* --- THE MASTER ANIMATED NEON CARD --- */}
              <div className="relative w-full max-w-[580px] aspect-[1.58/1] rounded-[2.2rem] md:rounded-[3.2rem] p-[4px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2rem] md:rounded-[3rem] p-7 md:p-12 overflow-hidden flex flex-col justify-between z-10">
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />

                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center border border-cyan-400/30">
                        <Layers size={28} className="md:w-9 md:h-9 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm md:text-xl font-black italic text-white uppercase tracking-tight">Identity Pass</p>
                        <p className="text-[9px] md:text-[12px] font-mono text-white/40 uppercase tracking-tighter mt-1">ID: //SOL-{data.id} * ACCESS//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-7 h-7 md:w-10 md:h-10" />
                  </div>

                  {/* Center */}
                  <div className="flex items-center gap-6 md:gap-10 text-left">
                    <div className="w-16 h-11 md:w-24 md:h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={32} className="md:w-12 md:h-12 text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] leading-none">{data.sol}</h2>
                        <p className="text-[9px] md:text-[12px] font-mono text-white/40 tracking-[0.5em] uppercase mt-2 italic font-bold">SOL_NETWORK_RESERVE</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-6 md:pt-10">
                    <div className="text-left">
                        <p className="text-[9px] md:text-[12px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">SECURED_NODE_ACCESS</p>
                        <p className="text-xs md:text-lg font-black italic tracking-tight text-white/80">CLASS: //{data.status}</p>
                    </div>
                    <div className="w-12 h-12 md:w-20 md:h-20 bg-cyan-400 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                        <Zap size={28} className="md:w-12 md:h-12 text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={saveCard} 
                className="flex items-center gap-5 bg-white/5 border border-white/10 px-16 py-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 mb-20 group"
              >
                DOWNLOAD MASTER ID <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pb-10 opacity-30 text-center">
           <p className="text-[10px] font-mono tracking-[1em] uppercase">
             By <span className="text-white border-b border-cyan-500 font-black italic">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}