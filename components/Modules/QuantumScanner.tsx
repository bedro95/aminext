"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Wallet, Activity } from 'lucide-react';
import { getWalletInfo } from '@/lib/solana-connection';

export default function QuantumScanner() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!address) return;
    setLoading(true);
    const result = await getWalletInfo(address);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 glass-morphism rounded-3xl border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#00FFCC]/20 rounded-lg">
          <Activity className="w-5 h-5 text-[#00FFCC]" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tighter">Quantum Scanner</h2>
      </div>

      <div className="relative">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Solana Wallet Address..."
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-[#00FFCC]/50 transition-colors"
        />
        <button
          onClick={handleScan}
          disabled={loading}
          className="absolute right-2 top-2 p-2 bg-[#00FFCC] rounded-xl text-black hover:scale-105 transition-transform disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs text-white/40 uppercase font-mono">SOL Balance</span>
            <span className="text-lg font-bold text-[#00FFCC]">{data.balance.toFixed(4)} SOL</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest pl-1">Recent Transactions</span>
            {data.transactions.map((tx: any, i: number) => (
              <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 flex flex-col gap-1 overflow-hidden">
                <span className="text-[9px] font-mono text-white/60 truncate">{tx.signature}</span>
                <div className="flex justify-between text-[8px] font-mono uppercase">
                  <span className={tx.err ? "text-red-400" : "text-green-400"}>{tx.err ? "Failed" : "Success"}</span>
                  <span className="text-white/20">{new Date(tx.blockTime * 1000).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Code Manifest Snippet */}
      <div className="mt-auto border-t border-white/5 pt-6">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">Code_Manifest.v3</span>
           <div className="w-1 h-1 bg-[#00FFCC] rounded-full animate-pulse" />
        </div>
        <pre className="text-[7px] font-mono text-[#00FFCC]/40 p-3 bg-black/60 rounded-lg overflow-hidden border border-white/5">
          {`const connection = new Connection(RPC);
export async function getMetrics() {
  const [tps, epoch] = await Promise.all([
    connection.getRecentPerformanceSamples(1),
    connection.getEpochInfo()
  ]);
  return { tps, epoch };
}`}
        </pre>
      </div>
    </div>
  );
}
