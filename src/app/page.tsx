"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Share2, Shield, Target, Award } from 'lucide-react';

export default function WagmiCTEdition() {
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
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1000000000;

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      const totalTokens = tokenAccounts.value.length;
      const isProfitable = solAmount > 1 || totalTokens > 10;
      const winRate = isProfitable ? (82 + Math.random() * 15).toFixed(1) : (45 + Math.random() * 15).toFixed(1);

      setData({
        sol: solAmount,
        tokens: totalTokens,
        winRate: winRate,
        status: isProfitable ? "CHAD" : "SURVIVOR",
        rank: isProfitable ? "DIAMOND HANDS" : "DEGEN",
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });

    } catch (err) {
      alert("Address decryption failed. Check your input.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnX = () => {
    const text = `🚨 WAGMI ANALYSIS REPORT 🚨\n\nRank: ${data.rank}\nWin Rate: ${data.winRate}%\nAssets: ${data.tokens} Tokens\n\nAnalyzed via @WagmiTerminal\n#Solana #WAGMI`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute text-[10px] font-mono text-cyan-500 whitespace-nowrap"
            style={{ left: `${i * 7}%` }}
          >
            {Array(50).fill("WAGMI").join(" ")}
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-lg">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">WAGMI</h1>
          <p className="text-[10px] tracking-[0.6em] text-cyan-500 font-bold uppercase mt-2">Neural Terminal v4.0</p>
        </div>

        {/* Search Box */}
        <div className="relative mb-12 group">
          <input 
            className="w-full bg-transparent border-b-2 border-white/20 p-4 text-center text-xl font-mono outline-none focus:border-cyan-500 transition-all uppercase placeholder:text-gray-800"
            placeholder="INPUT_SOL_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            className="absolute right-0 bottom-4 text-cyan-500 hover:text-white transition-colors"
          >
            {loading ? "..." : <Zap size={24} fill="currentColor" />}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 100, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              className="relative bg-gradient-to-br from-[#111] to-[#000] border-2 border-white/10 p-1 shadow-[0_30px_60px_rgba(0,0,0,1)]"
            >
              {/* The Actual Card Design */}
              <div className="border border-white/5 p-8 relative">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-mono text-cyan-500 tracking-widest uppercase">Identity: {data.address}</span>
                  </div>
                  <Shield size={16} className="text-white/20" />
                </div>

                <div className="flex flex-col items-center text-center mb-10">
                   <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">Portfolio Ranking</p>
                   <h2 className="text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                     {data.rank}
                   </h2>
                   <div className="px-4 py-1 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-tighter">
                     Win Rate: {data.winRate}%
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                    <div className="text-left border-r border-white/10">
                        <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">Total Assets</p>
                        <p className="text-xl font-black">{data.tokens} <span className="text-[10px] text-gray-500">Tokens</span></p>
                    </div>
                    <div className="text-right pl-4">
                        <p className="text-[8px] font-mono text-gray-600 uppercase mb-1">Net Worth</p>
                        <p className="text-xl font-black text-cyan-400">{data.sol.toFixed(2)} <span className="text-[10px]">SOL</span></p>
                    </div>
                </div>

                {/* Cyber Decorations */}
                <div className="absolute bottom-2 right-2 opacity-10">
                    <Award size={40} />
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex border-t border-white/10 bg-white/5">
                 <button 
                   onClick={shareOnX}
                   className="flex-1 p-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all font-black text-[10px] uppercase tracking-widest"
                 >
                   <Twitter size={14} fill="currentColor" /> Share on X
                 </button>
                 <button className="p-4 border-l border-white/10 hover:bg-cyan-500 hover:text-black transition-all">
                    <Share2 size={16} />
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-[9px] font-mono text-gray-700 mt-12 tracking-[0.5em] uppercase">
          Powered by <span className="text-white">Bader Alkorgli</span> // Global Node v4.1
        </p>
      </motion.div>
    </div>
  );
}