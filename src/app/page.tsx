"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, ExternalLink, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimateTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // وظيفة المسح (Scanner) - تم إصلاحها لتعمل بكفاءة عالية
  const startScanning = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // الاتصال بشبكة سولانا باستخدام RPC مستقر
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;

      // منطق تحديد الرتبة والعملة (Holder Logic)
      let rank = "SOLANA SOLDIER";
      let topAsset = "SOL";

      if (solAmount >= 100) rank = "SOLANA WHALE";
      else if (solAmount >= 10) rank = "ALPHA TRADER";

      // ميزة التعرف على الحاملين (مثال: عملة Troll)
      if (address.toLowerCase().includes('troll')) {
        rank = "TROLL HODLER";
        topAsset = "TROLL";
      }

      setData({
        amount: solAmount.toFixed(2),
        rank: rank,
        asset: topAsset,
        id: Math.floor(1000 + Math.random() * 9000)
      });

      // الانتقال السلس للنتيجة
      setTimeout(() => {
        const resultView = document.getElementById('id-card-view');
        if (resultView) resultView.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (e) {
      alert("Address Error: Please ensure the Solana address is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Background Lights */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[70vw] h-[70vw] bg-cyan-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-[-10%] w-[70vw] h-[70vw] bg-purple-900/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* --- HERO SECTION & LOGO --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo Optimization: Scalable and Non-overlapping */}
          <h1 className="text-[18vw] md:text-[15rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-700 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            WAGMI
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-12 md:w-24 bg-cyan-500/50" />
            <p className="text-[10px] md:text-sm font-mono tracking-[1.2em] text-cyan-400 uppercase italic font-black">Pulse Terminal v3.0</p>
            <div className="h-[1px] w-12 md:w-24 bg-cyan-500/50" />
          </div>
        </motion.div>

        {/* Input System */}
        <div className="mt-20 w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full p-6 text-center outline-none font-mono text-white text-lg placeholder:text-gray-800" 
              placeholder="PASTE SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={startScanning}
            disabled={loading}
            className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-lg tracking-[0.4em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-2xl disabled:opacity-50"
          >
            {loading ? "SCANNING CORE..." : "AUTHORIZE SCAN"}
          </button>
        </div>
      </section>

      {/* --- ID CARD RESULT --- */}
      <AnimatePresence>
        {data && (
          <section id="id-card-view" className="relative z-10 py-32 flex flex-col items-center bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[600px] px-6 flex flex-col items-center">
              
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[4px] overflow-hidden group shadow-[0_0_100px_rgba(6,182,212,0.2)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5 leading-none">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                        <Layers className="text-cyan-400 w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-xl font-black italic text-white uppercase tracking-tighter">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase mt-1 tracking-widest italic font-bold">SN: //WAGMI-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8" />
                  </div>

                  {/* Wealth Metrics */}
                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={35} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none drop-shadow-2xl">{data.amount}</h2>
                        <p className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase mt-2 italic font-bold">RESERVE: {data.asset}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 font-bold">SECURITY: VERIFIED</p>
                        <p className="text-lg md:text-xl font-black italic tracking-tight text-white/90 uppercase leading-none">RANK: {data.rank}</p>
                    </div>
                    <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                        <Zap size={35} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l = document.createElement('a'); l.download = 'WAGMI-PASS.png'; l.href = url; l.click(); })}
                className="mt-12 flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all active:scale-95 group"
              >
                EXPORT SYSTEM DATA <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- FEATURE CARDS --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <ShieldCheck size={40} />, title: "SECURE SCAN", desc: "Real-time verification across Solana Mainnet Beta nodes." },
            { icon: <Activity size={40} />, title: "LIVE STATS", desc: "Instantly fetch liquidity and asset distribution metrics." },
            { icon: <Globe size={40} />, title: "UNIVERSAL", desc: "Compatible with all SPL wallets and hardware modules." }
          ].map((feat, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.08] transition-all group">
              <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">{feat.icon}</div>
              <h3 className="text-2xl font-black italic mb-4 tracking-tighter uppercase">{feat.title}</h3>
              <p className="text-gray-400 leading-relaxed font-mono text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Wagmi Pulse</h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-[0.6em] uppercase mt-2 italic">Elite Solana Identity Interface</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-4 bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-400 hover:text-white transition-all">
              <Github size={20} /> SOURCE CODE
            </a>
            <p className="text-[10px] font-mono tracking-[0.8em] text-gray-600 uppercase">
              Designed by <span className="text-white font-black italic underline decoration-cyan-500">Bader Alkorgli</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>
    </div>
  );
}