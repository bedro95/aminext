"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity, Cpu, Globe, BarChart3, LineChart } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiTerminalFinal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة محسنة لجلب الأسعار مع معالجة الأخطاء
  const fetchPrices = async () => {
    try {
      // استخدام رابط Jupiter المباشر والموثوق
      const response = await fetch('https://api.jup.ag/price/v2?ids=SOL,JUP,BTC,WIF,BONK', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();
      
      if (result && result.data) {
        setPrices({
          SOL: result.data.SOL?.price || 0,
          JUP: result.data.JUP?.price || 0,
          BTC: result.data.BTC?.price || 0,
          WIF: result.data.WIF?.price || 0,
          BONK: result.data.BONK?.price || 0
        });
      }
    } catch (error) {
      console.error("Price fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // تحديث كل 10 ثوانٍ لضمان الدقة
    return () => clearInterval(interval);
  }, []);

  const playSound = (freq: number) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const analyzeWallet = async () => {
    if (!address) return;
    playSound(200);
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
        playSound(500);
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (75 + Math.random() * 20).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: ["SOL", "JUP", "WIF", "BONK"][Math.floor(Math.random() * 4)],
          bigWinMultiplier: (5 + Math.random() * 10).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* Top Ticker */}
      <div className="w-full bg-white/[0.02] border-b border-white/5 py-3 px-6 flex gap-8 items-center z-50 overflow-hidden">
        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"/><span className="text-[10px] font-mono font-bold text-gray-400">MARKET_PULSE:</span></div>
        <div className="flex gap-12 text-[10px] font-mono font-bold">
           <span className="flex gap-2 text-white">SOL <span className="text-cyan-400">${Number(prices.SOL).toFixed(2)}</span></span>
           <span className="flex gap-2 text-white">JUP <span className="text-purple-400">${Number(prices.JUP).toFixed(4)}</span></span>
           <span className="flex gap-2 text-white">BTC <span className="text-yellow-500">${Number(prices.BTC).toLocaleString()}</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center py-16 px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl text-center">
          
          <h1 className="text-8xl font-black tracking-tighter italic text-white mb-2 uppercase drop-shadow-2xl italic">Wagmi</h1>
          <div className="flex items-center justify-center gap-3 mb-16">
              <Activity className="text-cyan-500" size={14} />
              <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 font-bold uppercase italic">Neural Terminal v16.0</span>
          </div>

          <div className="space-y-4 mb-20 relative">
            <input 
              className="w-full bg-white/5 border border-white/10 p-7 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500 transition-all shadow-inner"
              placeholder="ENTER_SOL_ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button 
              onClick={analyzeWallet}
              disabled={loading}
              className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-black rounded-3xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl"
            >
              {loading ? "INITIALIZING SCAN..." : "RUN ANALYSIS"} <Zap size={20} fill="currentColor" />
            </button>
          </div>

          <AnimatePresence>
            {data && (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div ref={cardRef} className="p-12 rounded-[3.5rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-8 shadow-2xl">
                  <motion.div animate={{ y: [0, 500, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20"/>
                  
                  <div className="flex justify-between items-center mb-12">
                     <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[9px] font-mono text-cyan-400 font-bold">ID: {data.address}</div>
                     <ShieldCheck className="text-cyan-500" size={24} />
                  </div>

                  <div className="space-y-10">
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1 font-bold italic">Classification</p>
                      <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter">{data.status}</h2>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 p-7 rounded-3xl">
                      <p className="text-[10px] font-mono text-cyan-500 font-black uppercase mb-2 italic">Top Performance</p>
                      <h3 className="text-3xl font-black text-white italic">{data.bigWinToken} <span className="text-cyan-500 ml-2">+{data.bigWinMultiplier}x</span></h3>
                    </div>
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 font-bold italic">Verified Balance</p>
                      <p className="text-7xl font-black text-white tracking-tighter">
                          {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-3xl text-cyan-500 font-light ml-4 italic">SOL</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button onClick={() => toPng(cardRef.current!).then(url => { const a=document.createElement('a'); a.download='WAGMI.png'; a.href=url; a.click(); })}
                  className="w-full h-16 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all mb-12 flex items-center justify-center gap-3">
                  <Download size={20} /> Save Visual Report
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Market Trending Section */}
          <div className="mt-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 text-left">
             <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="text-cyan-500" size={20} />
                <h4 className="font-black uppercase tracking-widest text-xs italic">Market Trending</h4>
             </div>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { sym: 'SOL', price: prices.SOL, color: 'text-cyan-400' },
                  { sym: 'JUP', price: prices.JUP, color: 'text-purple-400' },
                  { sym: 'WIF', price: prices.WIF, color: 'text-yellow-500' },
                  { sym: 'BONK', price: prices.BONK, color: 'text-orange-400' }
                ].map((token) => (
                   <div key={token.sym} className="bg-black/40 p-5 rounded-3xl border border-white/5 flex flex-col gap-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[11px] font-bold text-gray-400 uppercase">{token.sym}</span>
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"/>
                      </div>
                      <span className={`font-mono text-lg font-black ${token.color}`}>
                        ${token.price ? (token.sym === 'BONK' ? Number(token.price).toFixed(7) : Number(token.price).toFixed(2)) : '---'}
                      </span>
                   </div>
                ))}
             </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 opacity-50">
            <p className="text-[11px] font-mono tracking-[0.5em] text-gray-400 font-bold uppercase italic">
              Developed by <span className="text-white drop-shadow-[0_0_8px_white]">Bader Alkorgli</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}