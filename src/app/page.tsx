"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot, CreditCard } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiHorizontalNeonEdition() {
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
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `Wagmi-Card.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-[-10%] w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-10">
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-2">WAGMI</h1>
        <p className="text-xs font-bold tracking-[0.5em] text-gray-400 uppercase mb-16 italic text-center">Universal Solana Terminal</p>

        {/* Input UI */}
        <div className="w-full max-w-md mb-20 space-y-4">
            <input 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center outline-none focus:border-cyan-500 transition-all" 
              placeholder="ENTER SOLANA WALLET"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={analyze} disabled={loading} className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 transition-all">
               {loading ? "SCANNING..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <div className="flex flex-col items-center gap-10">
              {/* THE EXACT HORIZONTAL CARD FROM YOUR IMAGE */}
              <div ref={cardRef} className="relative w-[340px] md:w-[500px] aspect-[1.58/1] bg-[#0a0a0a] rounded-[2rem] p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
                
                {/* Background Pattern Effect */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '20px 20px' }} />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                        <Layers size={20} className="text-cyan-400" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-sm font-bold italic">Identity Pass</p>
                        <p className="text-[9px] font-mono text-white/40 tracking-tighter">ID: //SOLANA #{data.id} * 9000//</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_#06b6d4]">
                        <ShieldCheck size={20} className="text-cyan-400" />
                    </div>
                  </div>

                  {/* Middle Balance Section */}
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-10 bg-gray-800 rounded-md border border-white/10 opacity-60 flex items-center justify-center">
                        <CreditCard size={24} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black tracking-tight">{data.sol}</h2>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none">SOLANEX00</p>
                    </div>
                  </div>

                  <p className="text-left text-[10px] font-bold text-white/60 tracking-widest">{data.status}</p>

                  {/* Bottom Footer */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div className="text-left">
                        <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">ENTER SOLANA WALLET</p>
                        <p className="text-[10px] font-black italic">ID: //{data.status}</p>
                    </div>
                    <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/40 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <Zap size={20} className="text-cyan-400" fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                {/* Inner Border Glow */}
                <div className="absolute inset-0 border-[1px] border-cyan-400/20 rounded-[2rem] pointer-events-none" />
              </div>

              <button onClick={saveCard} className="flex items-center gap-3 bg-cyan-400 text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                DOWNLOAD <Zap size={18} fill="currentColor" />
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}