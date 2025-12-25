"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot, Cpu } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiEliteCardEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 3, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-IDENTITY-CARD.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Please take a screenshot for now.");
    }
  };

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
        status: sol >= 100 ? "LEGENDARY WHALE" : sol >= 10 ? "ALPHA CHAD" : "RETAIL TRADER",
        id: Math.floor(100000 + Math.random() * 900000)
      });
    } catch (e) { alert("Invalid Solana Address"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Background FX (Keeping your preferred style) */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-12 text-center flex flex-col items-center">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-8xl md:text-[10rem] font-black italic tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent">WAGMI</motion.h1>
        <p className="text-[10px] font-mono tracking-[1em] text-cyan-500 uppercase mb-12 font-bold italic">Neural Terminal v25.5</p>

        {/* Search Input Box */}
        <div className="w-full max-w-lg space-y-4 mb-20 bg-white/5 p-2 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
          <input className="w-full bg-transparent p-6 text-center font-mono text-lg outline-none focus:placeholder:opacity-0 transition-all" placeholder="ENTER SOLANA WALLET" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={analyze} disabled={loading} className="w-full h-20 bg-white text-black rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-cyan-500 transition-all flex items-center justify-center gap-3">
            {loading ? "ANALYZING..." : <>SCAN IDENTITY <Zap size={20} fill="currentColor" /></>}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-10">
              
              {/* THE EXACT IMAGE-STYLE CARD */}
              <div ref={cardRef} className="relative w-[340px] md:w-[400px] aspect-[1/1.4] bg-[#080808] rounded-[3rem] p-10 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden group">
                
                {/* Internal Glows and Lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[1px] border-white/5 rounded-[3rem] m-2" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                        <Layers size={24} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase text-cyan-400 tracking-tighter">Black Pass</p>
                        <p className="text-[9px] font-mono text-white/30 italic uppercase">Serial: {data.id}</p>
                      </div>
                    </div>
                    <ShieldCheck className="text-white/20" size={32} />
                  </div>

                  {/* Identity Middle Part */}
                  <div className="text-left py-10">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] italic mb-2">Class Identity</p>
                    <h2 className="text-5xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-[0.8] bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                      {data.status}
                    </h2>
                  </div>

                  {/* Bottom Stats Part */}
                  <div className="space-y-6">
                    <div className="flex flex-col items-start border-t border-white/10 pt-8">
                      <p className="text-[9px] font-mono text-white/20 uppercase italic mb-2 tracking-[0.3em]">Net Worth Value</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white">{data.sol}</span>
                        <span className="text-xl font-black text-cyan-400 italic">SOL</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Status: Verified</span>
                        <div className="h-1 w-12 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                    </div>
                  </div>
                </div>

                {/* Vertical Laser Scan Effect */}
                <motion.div 
                  animate={{ top: ['-10%', '110%'] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-[2px] z-20" 
                />
              </div>

              <button onClick={saveCard} className="flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-2xl">
                <Download size={16} /> Export Identity
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-32 pt-10 border-t border-white/5 pb-20">
           <p className="text-[10px] font-mono tracking-[0.5em] uppercase italic text-gray-500 font-bold">
             Architected by <span className="text-white border-b border-cyan-500/50">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      {/* Floating Chat Widget (Hidden trigger for now as per instructions) */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-all border border-white/20">
          {isChatOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
        </button>
        {/* ... (Chat Window Logic) */}
      </div>
    </div>
  );
}