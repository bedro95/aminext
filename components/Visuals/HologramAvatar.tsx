"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HologramAvatar() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[80vw] h-[80vh] opacity-[0.07]"
      >
        <img 
          src="/senku.GIF" 
          alt="Senku Watermark"
          className="w-full h-full object-contain mix-blend-screen grayscale brightness-200"
        />
        
        {/* Scan Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,204,0.05)_50%,transparent_100%)] bg-[length:100%_8px] animate-[scan_20s_linear_infinite]" />
      </motion.div>

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-50%); }
          to { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
}
