"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, Rocket, ShieldCheck } from 'lucide-react';

const ROADMAP = [
  {
    phase: "Phase 01: Genesis",
    title: "Terminal Architecture",
    items: ["Core UI Deployment", "Solana Mainnet Link", "Senku AI Alpha"],
    icon: Target,
    status: "completed"
  },
  {
    phase: "Phase 02: Intelligence",
    title: "Elite Tooling",
    items: ["Whale Radar V2", "RugShield Security", "Quantum Scanner"],
    icon: ShieldCheck,
    status: "active"
  },
  {
    phase: "Phase 03: Expansion",
    title: "Global Ecosystem",
    items: ["Mobile App Launch", "Cross-Chain Hub", "Community Governance"],
    icon: Rocket,
    status: "upcoming"
  }
];

export default function RoadmapSection() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">Project Roadmap</h3>
        <p className="text-white/40 font-mono text-xs max-w-xl leading-relaxed">
          The systematic evolution of the Senku Protocol, engineered for absolute precision and long-term sustainability.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 pl-8 border-l-2 border-[#00FFCC]/20">
        {ROADMAP.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Node */}
              <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 bg-black z-10 flex items-center justify-center ${step.status === 'completed' ? 'border-[#00FFCC]' : step.status === 'active' ? 'border-[#00FFCC] animate-pulse' : 'border-white/20'}`}>
                {step.status === 'completed' && <div className="w-2 h-2 rounded-full bg-[#00FFCC]" />}
              </div>

              <div className="glass-morphism p-6 rounded-3xl border border-white/10 flex flex-col gap-4 hover:border-[#00FFCC]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#00FFCC] uppercase tracking-[0.3em] font-bold">{step.phase}</span>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">{step.title}</h4>
                  </div>
                  <Icon className={`w-8 h-8 ${step.status === 'upcoming' ? 'text-white/20' : 'text-[#00FFCC]'}`} />
                </div>
                
                <ul className="flex flex-col gap-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/50 text-xs font-mono uppercase">
                      <div className="w-1 h-1 rounded-full bg-[#00FFCC]/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sustainability Section */}
      <div className="mt-8 glass-morphism p-10 rounded-[2.5rem] border border-[#00FFCC]/20 bg-gradient-to-br from-[#00FFCC]/5 to-transparent">
        <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">Sustainable Protocol Evolution</h4>
        <p className="text-white/60 text-sm font-mono leading-relaxed uppercase tracking-wide">
          Building a perpetual Web3 ecosystem through professional, high-performance tools and sustainable on-chain infrastructure.
        </p>
      </div>
    </div>
  );
}
