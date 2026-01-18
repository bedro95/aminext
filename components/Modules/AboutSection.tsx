"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BrainCircuit, Globe } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">About Senku</h3>
        <p className="text-[#00FFCC] font-mono text-xs tracking-[0.2em] font-bold">Scientific Edge / Terminal Intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-morphism p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00FFCC]/10 rounded-2xl">
              <BrainCircuit className="w-8 h-8 text-[#00FFCC]" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Our Mission</h4>
          </div>
          <p className="text-white/50 text-sm font-mono leading-relaxed uppercase">
            Senku is engineered to empower traders and developers with advanced, elite-grade tools on the Solana blockchain.
          </p>
        </div>

        <div className="glass-morphism p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <Terminal className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Terminal Tech</h4>
          </div>
          <p className="text-white/50 text-sm font-mono leading-relaxed uppercase">
            Designed for the 1%, our interface combines type-II civilization aesthetics with zero-latency data streams.
          </p>
        </div>
      </div>

      <div className="glass-morphism p-10 rounded-[2.5rem] border border-white/5 bg-black/40">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-[#00FFCC] animate-pulse" />
          <span className="text-xs font-mono text-[#00FFCC] uppercase tracking-widest font-bold">Network Status: Global Alpha</span>
        </div>
        <p className="text-white/30 text-xs font-mono leading-loose uppercase tracking-widest italic">
          Senku Protocol operates as a decentralized intelligence layer, providing real-time synthesis of the Solana ledger. Every tool is refined for absolute efficiency, ensuring you maintain a permanent scientific edge in the digital frontier.
        </p>
      </div>
    </div>
  );
}
