"use client";
import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Search, Wallet, Activity, ArrowUpRight } from 'lucide-react';

export default function WagmiSolana() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBalance = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const key = new PublicKey(address);
      const bal = await connection.getBalance(key);
      setBalance(bal / 1000000000); // تحويل من Lamports إلى SOL
    } catch (err) {
      alert("Address not found or invalid!");
      setBalance(null);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* خلفية متحركة (السهوم والأشكال اللي طلبتها) */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: -100, x: Math.random() * 1000 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
            className="absolute text-blue-500/20"
          >
            <ArrowUpRight size={Math.random() * 40 + 20} />
          </motion.div>
        ))}
      </div>

      {/* محتوى الأداة */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-tr from-purple-500 to-cyan-500 p-3 rounded-xl">
            <Wallet className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">WAGMI SOL Scanner</h1>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Enter Solana Address..."
              className="w-full bg-black/40 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 transition-all pl-12"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-500" size={20} />
          </div>

          <button 
            onClick={checkBalance}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {loading ? "Scanning Network..." : "Analyze Wallet"}
          </button>

          {balance !== null && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5"
            >
              <p className="text-gray-400 text-sm">Real-time Balance</p>
              <h2 className="text-4xl font-black text-cyan-400">{balance.toFixed(4)} <span className="text-sm text-white">SOL</span></h2>
              <div className="mt-4 flex items-center gap-2 text-green-400 text-xs">
                <Activity size={14} />
                <span>Live on Solana Mainnet</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <p className="mt-8 text-gray-600 text-xs font-mono">WAGMI PROJECT v2.0 - Powered by Bader</p>
    </div>
  );
}