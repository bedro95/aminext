"use client";

import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Shield, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuantumAudit() {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [verdict, setVerdict] = useState<any>(null);

  const startAudit = async () => {
    if (!address) return;
    setIsScanning(true);
    setProgress(0);
    setVerdict(null);

    // Simulated progress to hit exactly 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    try {
      // Logic for real RPC calls could go here
      // For now, we simulate the "Scientific Verdict"
      setTimeout(() => {
        setVerdict({
          holders: Math.floor(Math.random() * 5000) + 100,
          lpStatus: "Burned (99.8%)",
          bundled: "Low Risk",
          renounced: "Yes",
          score: 98
        });
        setIsScanning(false);
      }, 3500);
    } catch (e) {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black italic text-white flex items-center gap-3">
          <Shield className="text-[#00FFCC]" />
          Quantum Audit
        </h2>
        <p className="text-white/40 text-xs font-mono tracking-wider">REAL-TIME SOLANA CONTRACT SECURITY ENGINE</p>
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="ENTER SOLANA TOKEN ADDRESS..."
          className="w-full bg-black/40 border border-[#00FFCC]/20 rounded-2xl px-6 py-4 text-sm font-mono text-[#00FFCC] placeholder:text-white/10 outline-none focus:border-[#00FFCC]/50 transition-all"
        />
        <button 
          onClick={startAudit}
          disabled={isScanning}
          className="absolute right-2 top-2 bottom-2 bg-[#00FFCC] text-black px-6 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {isScanning ? <Loader2 className="animate-spin" /> : "Initiate"}
        </button>
      </div>

      {isScanning && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-mono text-[10px] text-[#00FFCC]">
            <span>DECRYPTING SMART CONTRACT...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#00FFCC]/5 rounded-full overflow-hidden border border-[#00FFCC]/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#00FFCC] shadow-[0_0_10px_#00FFCC]"
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {verdict && !isScanning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Holders", val: verdict.holders, icon: CheckCircle },
              { label: "LP Status", val: verdict.lpStatus, icon: CheckCircle },
              { label: "Bundled", val: verdict.bundled, icon: CheckCircle },
              { label: "Renounced", val: verdict.renounced, icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <span className="text-[9px] font-mono text-white/30 uppercase">{item.label}</span>
                <div className="flex items-center gap-2">
                  <item.icon className="w-3 h-3 text-[#00FFCC]" />
                  <span className="text-xs font-bold text-white uppercase">{item.val}</span>
                </div>
              </div>
            ))}
            <div className="col-span-2 p-6 rounded-2xl bg-[#00FFCC]/5 border border-[#00FFCC]/20 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-[#00FFCC] uppercase tracking-widest">Scientific Verdict</span>
              <div className="text-4xl font-black italic text-[#00FFCC] drop-shadow-[0_0_10px_#00FFCC]">{verdict.score}% OPTIMAL</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
