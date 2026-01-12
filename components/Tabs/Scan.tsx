"use client";

import { motion } from "framer-motion";
import { useRugScan } from "@/hooks/useRugScan";

export default function ScanTab() {
  const {
    address,
    setAddress,
    scan,
    loading,
    result,
    error,
  } = useRugScan();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      {/* LOGO */}
      <div className="text-center mb-12">
        <h1
          className="
            text-[14vw]
            sm:text-[12vw]
            md:text-[9rem]
            lg:text-[10rem]
            font-[1000] italic tracking-tighter leading-none
            bg-gradient-to-b from-white via-white to-green-500
            bg-clip-text text-transparent
            drop-shadow-2xl select-none px-4
          "
        >
          SENKU
        </h1>

        <p className="text-[10px] font-mono tracking-[1.5em] text-green-400 uppercase opacity-80 mt-2">
          Neural Scientific Protocol
        </p>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-xl flex gap-2">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter token address"
          className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
        />

        <button
          onClick={scan}
          disabled={loading || !address}
          className={`px-6 py-3 rounded-xl text-sm font-bold
            ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400"
            } text-black`}
        >
          {loading ? "SCANNING..." : "SCAN"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-400 text-xs font-mono tracking-widest">
          {error}
        </p>
      )}

      {/* RESULT */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 w-full"
        >
          {Object.entries(result).map(([key, value]) => (
            <div
              key={key}
              className="bg-black/50 border border-white/10 rounded-xl p-4 text-center"
            >
              <p className="text-[10px] uppercase tracking-widest text-white/40">
                {key}
              </p>
              <p className="mt-2 font-bold text-green-400 text-sm">
                {String(value)}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
