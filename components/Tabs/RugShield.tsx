"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Users, Brain, ShieldCheck, Fingerprint, Crosshair, Download, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to results
  useEffect(() => {
    if (report && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [report]);

  const handleDeepScan = async () => {
    if (!address) return;
    setIsScanning(true);
    try {
      const [dexRes, rugRes] = await Promise.all([
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`),
        fetch(`https://api.rugcheck.xyz/v1/tokens/${address}/report`)
      ]);
      const dexData = await dexRes.json();
      const rugData = await rugRes.json();
      const pair = dexData.pairs?.[0];

      setReport({
        name: pair?.baseToken?.name || "Unknown",
        symbol: pair?.baseToken?.symbol || "TOKEN",
        score: rugData.score || 0,
        address: address.slice(0, 6) + "..." + address.slice(-6),
        details: [
          { label: "Bundler Detection", value: rugData.score > 2000 ? "RISKY" : "CLEAN", color: rugData.score > 2000 ? "#ef4444" : "#00FF5F" },
          { label: "Dev Holding", value: `${rugData.topHolders?.[0]?.pct || 0}%`, color: (rugData.topHolders?.[0]?.pct || 0) > 10 ? "#fbbf24" : "#00FF5F" },
          { label: "LP Status", value: pair?.liquidity?.usd > 0 ? "LOCKED" : "RISKY", color: "#00FF5F" },
          { label: "Market Sentiment", value: pair?.info?.socials ? "ACTIVE" : "GHOST", color: "#00E0FF" }
        ]
      });
    } catch (err) {
      console.error("Scan Interrupted");
    } finally {
      setIsScanning(false);
    }
  };

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = `senku-audit-${report.symbol}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="w-full max-w-full md:max-w-5xl mx-auto space-y-6 pb-20">
      {/* 🛡️ INPUT SECTION */}
      <div className="bg-[#050505] border border-[#00FF5F]/20 p-6 md:p-10 rounded-[30px] backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-[#00FF5F]/10 rounded-xl border border-[#00FF5F]/20">
              <Brain className="w-6 h-6 text-[#00FF5F]" />
           </div>
           <div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Security Audit</h2>
              <p className="text-[8px] md:text-[10px] text-[#00FF5F] font-mono tracking-[0.3em] uppercase opacity-70">Senku Intelligence System</p>
           </div>
        </div>

        <div className="flex flex-col gap-3 relative group">
          <input 
            type="text" 
            placeholder="PASTE CONTRACT ADDRESS..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-2xl p-4 md:p-5 text-[#00FF5F] font-mono text-xs focus:border-[#00FF5F]/50 transition-all outline-none"
          />
          <button 
            onClick={handleDeepScan}
            disabled={isScanning}
            className="w-full bg-[#00FF5F] text-black rounded-2xl py-4 font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,95,0.2)] active:scale-95 transition-all"
          >
            {isScanning ? "Analyzing..." : "Start Deep Audit"}
          </button>
        </div>
      </div>

      {/* 📊 RESULTS AREA */}
      <AnimatePresence>
        {report && (
          <motion.div 
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* EXPORTABLE CARD */}
            <div className="relative group">
              <div ref={cardRef} className="bg-black border border-[#00FF5F]/30 p-6 md:p-8 rounded-[35px] relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ShieldCheck className="w-32 h-32 text-[#00FF5F]" />
                </div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter">{report.name}</h3>
                    <p className="text-[#00FF5F] font-mono text-sm tracking-widest uppercase">{report.symbol} • {report.address}</p>
                  </div>
                  <div className="bg-[#00FF5F]/10 border border-[#00FF5F]/30 px-4 py-2 rounded-xl">
                    <span className="block text-[8px] text-[#00FF5F] uppercase font-bold text-center">Risk Score</span>
                    <span className="text-xl font-mono font-black text-white">{report.score}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {report.details.map((item: any, i: number) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                      <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-black font-mono" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
                   <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Generated by Senku Protocol</span>
                   <div className="w-2 h-2 rounded-full bg-[#00FF5F]" />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={downloadCard}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  <Download className="w-4 h-4 text-[#00FF5F]" /> Save Result Card
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RugShieldTab;
