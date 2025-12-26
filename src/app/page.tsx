"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio, Cpu, Github, ExternalLink, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiDynamicAssetEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const pubKey = new PublicKey(address.trim());
      
      // 1. Get SOL Balance
      const solBalance = await connection.getBalance(pubKey);
      const solAmount = solBalance / 1_000_000_000;

      // 2. Fetch Token Accounts (Scanning for the biggest asset)
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      let topTokenName = "SOL";
      let topTokenAmount = solAmount;

      // Simple Logic: Look for the token with highest balance (placeholder for more complex price API)
      tokenAccounts.value.forEach((account: any) => {
        const amount = account.account.data.parsed.info.tokenAmount.uiAmount;
        if (amount > topTokenAmount) {
            topTokenAmount = amount;
            // In a real production, you'd fetch the symbol from a mint list. 
            // Here we simulate symbol detection or keep it as 'TOKEN'
            topTokenName = "ASSET"; 
        }
      });

      setData({
        sol: solAmount.toFixed(2),
        topToken: topTokenName,
        topAmount: topTokenAmount.toLocaleString(),
        status: `${topTokenName} HODLER`,
        id: Math.floor(1000 + Math.random() * 9000)
      });

      setTimeout(() => window.scrollTo({ top: 600, behavior: 'smooth' }), 200);
    } catch (e) { 
      alert("Address Scan Failed. Check Connection."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* BACKGROUND GLOWS */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[80vw] h-[80vw] bg-purple-700/10 blur-[150px] rounded-full" />
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-16">
          <h1 className="text-8xl md:text-[14rem] font-[1000] italic tracking-tighter leading-none bg-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[14px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic">
            ASSET TRACKER v3.5
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-20 group-focus-within:opacity-100 transition duration-700"></div>
            <input 
              className="relative w-full bg-black border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={analyze} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-lg tracking-[0.4em] hover:bg-cyan-400 hover:text-white transition-all shadow-2xl">
            {loading ? "SCANNING ASSETS..." : "GENERATE PASS"}
          </button>
        </div>
      </section>

      {/* RESULT SECTION */}
      <AnimatePresence>
        {data && (
          <section className="relative z-10 py-20 flex flex-col items-center">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-[600px] px-4 flex flex-col items-center gap-12">
              
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[3px] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)]">
                <div className="absolute inset-[-500%] animate-[spin_5s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.4rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between z-10">
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                        <Layers className="text-cyan-400 w-8 h-8" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xl font-black italic text-white uppercase">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase mt-1 tracking-widest italic">REF: //W-ID-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8" />
                  </div>

                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={32} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                          {data.topAmount} <span className="text-xl text-cyan-400">{data.topToken}</span>
                        </h2>
                        <p className="text-[10px] font-mono text-white/40 tracking-[0.5em] uppercase mt-2 italic font-bold">PRIMARY_NETWORK_ASSET</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">NODE_VERIFIED_IDENTITY</p>
                        <p className="text-lg md:text-xl font-black italic tracking-tight text-white/90">RANK: //{data.status}</p>
                    </div>
                    <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-white/20">
                        <Zap size={32} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const a = document.createElement('a'); a.download = 'WAGMI-ID.png'; a.href = url; a.click(); })}
                className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95"
              >
                SAVE IDENTITY PASS <Download size={18} />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2">WAGMI TERMINAL</h2>
            <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Elite Solana Identity Interface</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              <Github size={18} /> GITHUB REPO
            </a>
            <p className="text-[10px] font-mono tracking-[0.8em] text-gray-600 uppercase">
              By <span className="text-white font-black">Bader Alkorgli</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}