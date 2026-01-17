"use client";

import React, { useEffect, useState } from 'react';

const LOGS = [
  "Inbound Block: Solana #2948...8A",
  "Neural Link: Established",
  "Whale Alert: 50,000 SOL move",
  "Scanning: RugCheck-V3",
  "Entropy: Stable",
  "System: Sentinel Active",
  "Network: Mainnet-Beta",
  "Sync: 100%",
];

export default function CommBox() {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLogs(prev => {
        const next = [...prev, LOGS[Math.floor(Math.random() * LOGS.length)]];
        return next.slice(-8); // Keep last 8
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-40 bg-black/40 border border-[#00FFCC]/20 rounded-xl p-3 font-mono text-[9px] uppercase tracking-wider text-[#00FFCC]/60 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      <div className="flex flex-col gap-1">
        {activeLogs.map((log, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#00FFCC] rounded-full animate-pulse" />
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
