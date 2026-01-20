"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function NeuralEntryPortal({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px) contrast(200%)" }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(0, 255, 204, 0.3)",
              "0 0 60px rgba(0, 255, 204, 0.6)",
              "0 0 20px rgba(0, 255, 204, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-48 h-48 rounded-full border-2 border-[#00FFCC] p-4 bg-black flex items-center justify-center overflow-hidden"
        >
          <img src="/Senku-icon.png" alt="Senku" className="w-full h-full object-contain" />
        </motion.div>
        
        {/* Orbit Rings */}
        <div className="absolute inset-0 -m-8 border border-[#00FFCC]/20 rounded-full animate-spin-slow" />
        <div className="absolute inset-0 -m-16 border border-[#00FFCC]/10 rounded-full animate-reverse-spin-slow" />
      </div>

      <div className="mt-12 w-64">
        <div className="text-[#00FFCC] font-mono text-[10px] tracking-widest uppercase mb-2 text-center animate-pulse">
          INITIATING NEURAL LINK TO SENKU LABS... {loading}%
        </div>
        <div className="h-1 w-full bg-[#00FFCC]/10 rounded-full overflow-hidden border border-[#00FFCC]/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loading}%` }}
            className="h-full bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] shadow-[0_0_10px_#00FFCC]"
          />
        </div>
      </div>
    </motion.div>
  );
}
