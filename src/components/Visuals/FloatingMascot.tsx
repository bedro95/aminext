"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FloatingMascot() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[600] pointer-events-none md:pointer-events-auto">
      <div className="relative flex items-end justify-end">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-4 bg-black/80 border border-[#00FFCC]/30 backdrop-blur-md px-4 py-2 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(0,255,204,0.2)]"
            >
              <span className="text-[#00FFCC] font-mono text-[10px] whitespace-nowrap tracking-wider uppercase">
                SCIENTIFIC STATUS: OPTIMAL
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="w-20 h-20 cursor-help"
        >
          <img 
            src="/Senku-icon.png" 
            alt="Mascot" 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,255,204,0.5)] opacity-80 hover:opacity-100 transition-opacity" 
          />
        </motion.div>
      </div>
    </div>
  );
}

import { AnimatePresence } from "framer-motion";
