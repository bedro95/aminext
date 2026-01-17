import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Zap, Search } from 'lucide-react';

const SenkuCore = () => {
  const [address, setAddress] = useState('');

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-[#00ffcc] selection:text-black">
      {/* Visual Identity: Neon Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-3xl font-black tracking-tighter text-[#00ffcc] italic">SENKU</div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest text-gray-400">
          <span className="hover:text-[#00ffcc] cursor-pointer transition-colors uppercase">Intelligence</span>
          <span className="hover:text-[#00ffcc] cursor-pointer transition-colors uppercase">Ecosystem</span>
          <span className="hover:text-[#00ffcc] cursor-pointer transition-colors uppercase">Protocol</span>
        </div>
        <button className="px-6 py-2 border border-[#00ffcc] text-[#00ffcc] text-xs font-bold uppercase tracking-widest hover:bg-[#00ffcc] hover:text-black transition-all">Connect Terminal</button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter italic uppercase leading-none">
            Unmask <span className="text-[#00ffcc]">Solana</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light tracking-wide">
            The ultimate scientific intelligence protocol for deep-chain analysis. No fluff, just pure data.
          </p>
          
          {/* Main Action Component */}
          <div className="relative group max-w-2xl mx-auto mb-20 w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden">
              <input 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text" 
                placeholder="Enter Token Contract Address..."
                className="w-full bg-transparent p-6 outline-none text-[#00ffcc] placeholder:text-gray-600 font-mono"
              />
              <button className="bg-[#00ffcc] p-6 text-black hover:bg-white transition-colors">
                <Search size={24} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Empire Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-12">
            <div className="space-y-2">
              <Zap className="text-[#00ffcc] w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-tighter">Instant Analysis</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-mono">Real-time scan of mint authority and liquidity lock status.</p>
            </div>
            <div className="space-y-2 border-x border-white/5 px-0 md:px-8">
              <ShieldCheck className="text-[#00ffcc] w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-tighter">Rug Protection</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-mono">Advanced heuristics to detect malicious patterns before they hit.</p>
            </div>
            <div className="space-y-2">
              <Target className="text-[#00ffcc] w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-tighter">Whale Tracker</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-mono">Monitoring top holders and wallet clusters in real-time.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SenkuCore;
