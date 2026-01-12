"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type AgentProps = {
  activeTab: "scan" | "rug shield" | "radar" | "hall of fame";
};

const AGENT_TIPS: Record<AgentProps["activeTab"], string[]> = {
  scan: [
    "Paste a Solana address to initiate neural scan",
    "High score indicates low rug probability",
    "Analyze before you ape",
  ],
  "rug shield": [
    "Liquidity locks reduce rug risk",
    "Disabled mint prevents inflation attacks",
    "Distribution matters more than hype",
  ],
  radar: [
    "Whale accumulation precedes volatility",
    "MEV pressure signals incoming moves",
    "Follow smart money, ignore noise",
  ],
  "hall of fame": [
    "Protocols ranked by on-chain dominance",
    "Early intelligence defines market leaders",
  ],
};

export default function SenkuAgent({ activeTab }: AgentProps) {
  const message = useMemo(() => {
    const tips = AGENT_TIPS[activeTab];
    return tips[Math.floor(Math.random() * tips.length)];
  }, [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="fixed bottom-6 right-6 z-[999] flex items-end gap-3"
    >
      {/* AGENT AVATAR */}
      <motion.img
        src="/senku.GIF"
        alt="Senku Agent"
        className="w-20 h-20 rounded-2xl border border-green-500/30 bg-black/70 backdrop-blur-xl shadow-2xl"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* MESSAGE */}
      <div className="max-w-[220px] bg-black/80 border border-green-500/30 rounded-2xl px-4 py-3 text-[10px] font-mono text-green-400 uppercase tracking-widest shadow-xl">
        {message}
      </div>
    </motion.div>
  );
}
