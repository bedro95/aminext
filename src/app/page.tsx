"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Layers, Radio, Cpu, Github, ExternalLink, Shield } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimateScanner() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fetchIdentity = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // استخدام RPC قوي وموثوق
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const pubKey = new PublicKey(address.trim());
      
      // جلب رصيد SOL
      const solBalance = await connection.getBalance(pubKey);
      const sol = solBalance / 1_000_000_000;

      // محاكاة ذكية للتعرف على أكبر عملة (بناءً على الرصيد والنشاط)
      // ملاحظة: في النسخة المتقدمة نستخدمMoralis أو Helius لجلب أسماء العملات بالكامل
      let identityTitle = "SOLANA SOLDIER";
      let displayAsset = "SOL";
      let displayAmount = sol.toFixed(2);

      if (sol > 50) {
        identityTitle = "SOLANA WHALE";
      } else if (sol > 10) {
        identityTitle = "ALPHA TRADER";
      }

      // ميزة الـ Troll Hodler (إذا كانت المحفظة تحتوي على نمط معين من البيانات)
      // هنا نضع المنطق البرمجي لتغيير اللقب بناءً على المدخلات
      if (address.toLowerCase().endsWith('troll')) {
         identityTitle = "TROLL HODLER";
         displayAsset = "TROLL";
      }

      setData({
        sol: sol.toFixed(4),
        title: identityTitle,
        asset: displayAsset,
        amount: displayAmount,
        id: Math.floor(100000 + Math.random() * 900000)
      });

      // انتقال سلس للنتيجة
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (e) {
      alert("Address error: Please enter a valid Solana Public Key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-cyan-500">
      
      {/* Background Cinematic Lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-7xl md:text-[14rem] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
            WAGMI
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-12 bg-cyan-500" />
            <p className="text-xs md:text-sm font-mono tracking-[1.2em] text-cyan-400 uppercase italic font-bold">Pulse Interface</p>
            <div className="h-[1px] w-12 bg-cyan-500" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 w-full max-w-xl px-4"
        >
          <div className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent focus-within:from-cyan-500 transition-all duration-500">
            <input 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="PASTE SOLANA ADDRESS"
              className="w-full bg-[#050505] rounded-2xl p-6 text-center outline-none font-mono text-white placeholder:text-gray-700"
            />
          </div>
          <button 
            onClick={fetchIdentity}
            disabled={loading}
            className="w-full mt-6 py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50"
          >
            {loading ? "SCANNING REALM..." : "AUTHORIZE SCAN"}
          </button>
        </motion.div>
      </section>

      {/* Result Section */}
      <AnimatePresence>
        {data && (
          <section id="result-section" className="relative z-10 py-32 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[600px] px-6"
            >
              {/* The Master Card */}
              <div className="relative aspect-[1.58/1] rounded-[2.5rem] p-[3px] overflow-hidden group shadow-[0_0_80px_rgba(6,182,212,0.1)]">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                   {/* Background Elements */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                          <Layers className="text-cyan-400 w-8 h-8" />
                        </div>
                        <div className="text-left">
                           <h3 className="text-xl font-black italic uppercase text-white leading-none">Identity Pass</h3>
                           <p className="text-[10px] font-mono text-white/30 uppercase mt-1">SN: //WAGMI-PX-{data.id}//</p>
                        </div>
                      </div>
                      <Radio className="text-cyan-500 animate-pulse w-8 h-8 shadow-inner" />
                   </div>

                   <div className="text-left py-4">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                           <Cpu size={32} className="text-white/20" />
                        </div>
                        <div>
                           <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.5em] mb-1 font-bold">Network Assets</p>
                           <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                             {data.amount} <span className="text-lg md:text-2xl text-white/40">{data.asset}</span>
                           </h2>
                        </div>
                      </div>
                   </div>

                   <div className="flex justify-between items-end border-t border-white/5 pt-8">
                      <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest italic mb-1">Authorization Node: Active</p>
                        <p className="text-xl font-black italic tracking-tighter text-white/90">RANK: //{data.title}</p>
                      </div>
                      <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                        <Zap size={32} className="text-black" fill="currentColor" />
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-12 w-full">
                <button 
                  onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const a = document.createElement('a'); a.download = 'WAGMI-PASS.png'; a.href = url; a.click(); })}
                  className="flex-1 bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-3"
                >
                  <Download size={18} /> SAVE AS IMAGE
                </button>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* Features & Github Footer */}
      <footer className="relative z-10 py-20 mt-20 border-t border-white/5 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="text-center md:text-left">
              <h2 className="text-4xl font-black italic tracking-tighter">WAGMI PULSE</h2>
              <p className="text-gray-500 font-mono text-xs tracking-[0.5em] uppercase mt-2">The Next-Gen Solana Identity Hub</p>
           </div>
           
           <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-4">
                 <a href="https://github.com/bedro95" target="_blank" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all">
                    <Github size={24} />
                 </a>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-cyan-500">
                    <Shield size={24} />
                 </div>
              </div>
              <p className="text-[10px] font-mono tracking-[0.8em] text-gray-600 uppercase">
                Terminal by <span className="text-white font-black italic">Bader Alkorgli</span>
              </p>
           </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background: black; cursor: default; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }
      `}</style>
    </div>
  );
}