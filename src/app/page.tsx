"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity, Cpu, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiTerminalEmergency() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة جلب الأسعار باستخدام رابط بديل ومضمون
  const fetchPrices = async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["SOLUSDT","BTCUSDT"]');
      const binanceData = await response.json();
      
      // جلب أسعار العملات الأخرى من Jupiter مع معالجة الخطأ
      const jupRes = await fetch('https://api.jup.ag/price/v2?ids=JUP,WIF,BONK');
      const jupData = await jupRes.json();

      const newPrices = {
        SOL: binanceData.find((t: any) => t.symbol === "SOLUSDT")?.price || 0,
        BTC: binanceData.find((t: any) => t.symbol === "BTCUSDT")?.price || 0,
        JUP: jupData.data?.JUP?.price || 0,
        WIF: jupData.data?.WIF?.price || 0,
        BONK: jupData.data?.BONK?.price || 0,
      };
      setPrices(newPrices);
    } catch (error) {
      console.error("Price check failed, retrying...");
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      setTimeout(() => {
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          status: solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          address: address.slice(0, 4) + "..." + address.slice(-4),
          winRate: (80 + Math.random() * 15).toFixed(1)
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      alert("Error linking wallet");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. Live Market Ticker */}
      <div className="w-full bg-white/[0.03] border-b border-white/5 py-3 px-6 flex gap-8 items-center z-50 overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-cyan-400">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> LIVE_FEED:
        </div>
        <div className="flex gap-10 text-[10px] font-mono font-bold">
           <span>SOL: <span className="text-white">${Number(prices.SOL).toFixed(2)}</span></span>
           <span>JUP: <span className="text-white">${Number(prices.JUP).toFixed(4)}</span></span>
           <span>BTC: <span className="text-white">${Number(prices.BTC).toLocaleString()}</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center py-12 px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} className="w-full max-w-xl text-center">
          
          <h1 className="text-7xl font-black tracking-tighter italic mb-2">WAGMI</h1>
          <div className="flex items-center justify-center gap-3 mb-12 opacity-50 font-mono text-[9px] tracking-[0.6em]">
              <Activity size={12} /> NEURAL_TERMINAL_V.18
          </div>

          <div className="space-y-4 mb-16">
            <input 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono text-lg outline-none focus:border-cyan-500 transition-all"
              placeholder="PASTE_SOL_ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button 
              onClick={analyzeWallet}
              disabled={loading}
              className="w-full h-20 bg-cyan-500 text-black rounded-3xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              {loading ? "SCANNING..." : "IDENTIFY WALLET"} <Zap size={20} fill="currentColor" />
            </button>
          </div>

          <AnimatePresence>
            {data && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <div ref={cardRef} className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-6 shadow-2xl">
                  <motion.div animate={{ y: [0, 450, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 z-20 shadow-[0_0_15px_cyan]"/>
                  <div className="flex justify-between items-center mb-10 text-[10px] font-mono text-cyan-400">
                     <span>ID: {data.address}</span>
                     <ShieldCheck size={20} />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">{data.status}</h2>
                    <div className="pt-6 border-t border-white/5 font-mono">
                      <p className="text-gray-500 text-[10px] mb-1">NET_WORTH</p>
                      <p className="text-5xl font-black">{data.sol.toFixed(2)} SOL</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => toPng(cardRef.current!).then(url => { const a=document.createElement('a'); a.download='WAGMI.png'; a.href=url; a.click(); })}
                  className="w-full h-16 bg-white/10 rounded-2xl font-black uppercase tracking-widest mb-10 flex items-center justify-center gap-3">
                  <Download size={18} /> Download Card
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. Market Trending Section */}
          <div className="mt-8 bg-white/5 rounded-3xl p-8 border border-white/10 text-left">
             <div className="flex items-center gap-3 mb-6 font-black uppercase tracking-widest text-[10px] text-cyan-500 italic">
                <TrendingUp size={16} /> Market Trending
             </div>
             <div className="grid grid-cols-2 gap-4 font-mono">
                {[
                  { sym: 'SOL', price: prices.SOL },
                  { sym: 'JUP', price: prices.JUP },
                  { sym: 'WIF', price: prices.WIF },
                  { sym: 'BONK', price: prices.BONK }
                ].map((token) => (
                   <div key={token.sym} className="bg-black/60 p-4 rounded-2xl border border-white/5">
                      <p className="text-gray-500 text-[9px] mb-1">{token.sym}</p>
                      <p className="text-sm font-black text-white">
                        {token.price > 0 ? `$${Number(token.price).toFixed(token.sym === 'BONK' ? 6 : 2)}` : "CONNECTING..."}
                      </p>
                   </div>
                ))}
             </div>
          </div>

          {/* 3. Credits & Partners */}
          <div className="mt-20 pt-10 border-t border-white/5">
            <div className="flex justify-center gap-6 opacity-30 text-[9px] font-black uppercase tracking-widest mb-6">
               <span>Solana</span> <span>Jupiter</span> <span>Helius</span>
            </div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-gray-600 font-bold uppercase italic text-center">
              Developed by <span className="text-white">Bader Alkorgli</span>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}