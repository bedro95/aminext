"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlackHoleGateway({ onEnter }: { onEnter: () => void }) {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(onEnter, 1000);
  };

  return (
    <AnimatePresence>
      {!isEntering && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ scale: 0, rotate: 720, filter: 'blur(100px)', opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-black flex flex-center justify-center items-center overflow-hidden"
        >
          <div className="relative cursor-pointer" onClick={handleEnter}>
            {/* Vortex Layers */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-[#00FFCC] border-t-transparent shadow-[0_0_100px_#00FFCC]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-[#00E0FF] border-b-transparent shadow-[0_0_100px_#00E0FF] opacity-50"
            />
            <div className="absolute inset-0 flex flex-center justify-center items-center">
              <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter animate-pulse">
                SENKU
              </h1>
            </div>
            <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[#00FFCC] font-mono text-sm tracking-widest uppercase">
              Click to Initialize
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
