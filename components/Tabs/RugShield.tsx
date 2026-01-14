"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Brain, Download, ShieldAlert, Fingerprint, Users, Crosshair } from 'lucide-react';
import { toPng } from 'html-to-image';

const RugShieldTab = () => {
  const [address, setAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
        image: pair?.info?.imageUrl || "",
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
    try {
      // تحسين دقة التصدير لضمان ظهور الصور
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 3,
        skipFonts: true,
      });
      const link = document.createElement('a');
      link.download = `senku-audit-${report.symbol}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-5xl mx-auto space-y-6 pb-24 px-2">
      {/* 🛡️ INPUT SECTION */}
      <div className="bg-[#050505] border border-[#00FF5F]/20 p-6 md:p-10 rounded-[35px] backdrop-blur-3xl shadow-2xl relative">
        <div className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-[#00FF5F]/10 rounded-xl border border-[#00FF5F]/20">
              <Brain className="w-6 h-6 text-[#00FF5F]" />
           </div>
           <div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Security Audit</h2>
              <p className="text-[8px] md:text-[10px] text-[#00FF5F] font-mono tracking-[0.3em] uppercase opacity-70">Senku Intelligence System</p>
           </div>
        </div>

        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="PASTE CONTRACT ADDRESS..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 text-[#00FF5F] font-mono text-xs focus:border-[#00FF5F]/50 transition-all outline-none"
          />
          <button 
            onClick={handleDeepScan}
            disabled={isScanning}
            className="w-full bg-[#00FF5F] text-black rounded-2xl py-4 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
          >
            {isScanning ? "Analyzing Chain..." : "Start Deep Audit"}
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
            {/* THE EXPORTABLE CARD (FIXED) */}
            <div className="relative">
              <div 
                ref={cardRef} 
                className="bg-[#000000] border border-[#00FF5F]/30 p-8 rounded-[40px] relative overflow-hidden min-h-[500px] flex flex-col justify-between"
                style={{ backgroundColor: '#000000' }} // ضمان لون خلفية صلب للتصدير
              >
                {/* Fixed Dynamic Background Image */}
                {report.image && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={report.image} 
                      alt="" 
                      className="w-full h-full object-cover opacity-40 blur-[50px] scale-150"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black shadow-inner" />
                  </div>
                )}

                {/* Content Header */}
                <div className="relative z-20 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#00FF5F]/20 blur-lg rounded-full" />
                      <img 
                        src={report.image || "https://avatar.vercel.sh/senku"} 
                        className="w-16 h-16 rounded-2xl border-2 border-[#00FF5F]/30 shadow-2xl relative z-10 bg-black" 
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tighter leading-none uppercase">{report.name}</h3>
                      <p className="text-[#00FF5F] font-mono text-[10px] tracking-[0.2em] uppercase mt-2 font-bold">{report.symbol} • {report.address}</p>
                    </div>
                  </div>
                  <div className="bg-black/80 backdrop-blur-xl border border-[#00FF5F]/40 p-4 rounded-2xl text-center min-w-[90px] shadow-2xl">
                    <span className="block text-[8px] text-[#00FF5F] uppercase font-black mb-1">Risk Score</span>
                    <span className="text-2xl font-mono font-black text-white">{report.score}</span>
                  </div>
                </div>

                {/* Main Stats Details */}
                <div className="relative z-20 grid grid-cols-1 gap-3 my-8">
                  {report.details.map((item: any, i: number) => (
                    <div key={i} className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex justify-between items-center shadow-lg">
                      <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.2em] font-bold">{item.label}</span>
                      <span className="text-sm font-black font-mono tracking-tighter" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Brand */}
                <div className="relative z-20 pt-6 border-t border-white/10 flex justify-between items-center opacity-80">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00FF5F] animate-pulse" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white font-bold">Senku Protocol • Audit Result</span>
                   </div>
                   <ShieldCheck className="w-5 h-5 text-[#00FF5F]" />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button 
                onClick={downloadCard}
                className="w-full mt-6 bg-[#00FF5F] hover:shadow-[0_0_30px_#00FF5F] text-black py-5 rounded-[24px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all group active:scale-95"
              >
                <Download className="w-5 h-5" /> 
                Export Security Report (PNG)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RugShieldTab;
