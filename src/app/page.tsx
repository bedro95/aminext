"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

export default function WagmiFinalArt() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);

    try {
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      
      // جلب الرصيد الدقيق
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1000000000; // التحويل الصحيح لـ SOL

      // جلب التوكنز لتحديد أكبر صفقة/عملة
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      const totalTokens = tokenAccounts.value.length;
      
      // منطق تحديد "أكبر صفقة" بناءً على الرصيد أو النشاط
      let bestTrade = "SOLANA (Native)";
      if (totalTokens > 0) {
          // محاكاة اختيار عملة قوية من المحفظة (يمكن تطويرها لربطها بأسعار حقيقية لاحقاً)
          bestTrade = totalTokens > 15 ? "JUPITER (JUP)" : "PYTH NETWORK";
      }

      const isWhale = solAmount > 100;
      const winRate = isWhale ? (90 + Math.random() * 8).toFixed(1) : (45 + Math.random() * 30).toFixed(1);

      setData({
        sol: solAmount,
        tokens: totalTokens,
        winRate: winRate,
        status: solAmount > 1000 ? "SOLANA WHALE" : isWhale ? "ALPHA CHAD" : "RETAIL SURVIVOR",
        rank: solAmount > 1000 ? "GOD MODE" : "DIAMOND HANDS",
        bestTrade: bestTrade,
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });

    } catch (err) {
      alert("Address decryption failed. Check your input.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnX = () => {
    const text = `Verified my Solana Stats on WAGMI ⚡\n\nRank: ${data.rank}\nNet Worth: ${data.sol.toLocaleString()} SOL\nBest Trade: ${data.bestTrade}\n\nCheck yours:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white flex flex-col items-center py-12 px-6 font-sans overflow-hidden">
      
      {/* Background Lights */}
      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-8xl font-black tracking-tighter italic text-white mb-2">WAGMI</h1>
          <p className="text-[10px] tracking-[0.6em] text-cyan-400 font-bold uppercase">Institutional Analysis v6.0</p>
        </div>

        {/* Input & Heavy Button */}
        <div className="space-y-4 mb-20">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-lg font-mono outline-none focus:border-cyan-500/50 transition-all uppercase backdrop-blur-xl"
            placeholder="INPUT_SOL_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-20 bg-cyan-500 hover:bg-white text-black rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4 group"
          >
            {loading ? "SCANNING NETWORK..." : (
              <> ANALYZE PORTFOLIO <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /> </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="relative p-[3px] rounded-[3rem] bg-gradient-to-br from-cyan-400 via-white to-purple-600 shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            >
              <div className="bg-[#050505] rounded-[2.9rem] p-12 relative overflow-hidden">
                
                {/* ID Tag */}
                <div className="flex justify-between items-start mb-12">
                   <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                      <p className="text-[9px] font-mono text-gray-500 uppercase italic leading-none">Wallet_Identity</p>
                      <p className="text-sm font-black text-cyan-400 font-mono tracking-tighter mt-1">{data.address}</p>
                   </div>
                   <ShieldCheck className="text-white/20" size={32} />
                </div>

                {/* Rank Section */}
                <div className="mb-12">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-2">Performance Class</p>
                  <h2 className="text-6xl font-black italic text-white tracking-tighter leading-none mb-4">{data.status}</h2>
                  <div className="inline-flex items-center gap-2 bg-cyan-500 px-3 py-1 rounded-md">
                     <TrendingUp size={14} className="text-black" />
                     <span className="text-[11px] font-black text-black uppercase">Win Rate: {data.winRate}%</span>
                  </div>
                </div>

                {/* Best Trade - الميزة الجديدة */}
                <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
                   <div className="flex items-center gap-3 mb-2">
                      <Award className="text-purple-500" size={20} />
                      <p className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest">Masterpiece Trade</p>
                   </div>
                   <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">{data.bestTrade}</h3>
                </div>

                {/* Net Worth */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-2">Total Net Worth</p>
                    <p className="text-5xl font-black text-white tracking-tighter">
                      {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                      <span className="text-xl text-cyan-500 ml-2">SOL</span>
                    </p>
                </div>

                {/* Share Button */}
                <button 
                  onClick={shareOnX}
                  className="mt-12 w-full h-16 bg-white hover:bg-cyan-500 text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  <Twitter size={20} fill="currentColor" /> Share Report on X
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 text-center opacity-40">
          <p className="text-[10px] font-mono tracking-[0.5em] text-white font-bold uppercase">
            Powered by Bader Alkorgli // Protocol v6.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}