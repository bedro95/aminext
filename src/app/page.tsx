"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Cpu, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimateEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // حالات الشات
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 3, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-BLACK-ID.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Please take a screenshot for now on mobile devices.");
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(2),
        status: sol >= 100 ? "LEGENDARY WHALE" : sol >= 10 ? "SOLANA PRO" : "HODLER",
        id: Math.floor(100000 + Math.random() * 900000)
      });
    } catch (e) { alert("Invalid Solana Address"); } finally { setLoading(false); }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const context = data ? `User Wallet: ${data.sol} SOL, Status: ${data.status}` : "Browsing Wagmi Terminal.";
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: context })
      });
      const result = await response.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: result.text || "AI is currently syncing..." }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Connection error. Ensure API route is deployed." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-12 text-center">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-7xl md:text-9xl font-black italic tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent">WAGMI</motion.h1>
        <p className="text-[10px] font-mono tracking-[1em] text-cyan-500 uppercase mb-12 font-bold italic">Neural Terminal v25.5</p>

        <div className="space-y-4 mb-20">
          <input className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono text-sm md:text-lg outline-none focus:border-cyan-500 transition-all backdrop-blur-md" placeholder="ENTER SOLANA WALLET" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={analyze} disabled={loading} className="w-full h-20 bg-white text-black rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl">
            {loading ? "ANALYZING..." : <>SCAN IDENTITY <Zap size={20} fill="currentColor" /></>}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-10">
              <div ref={cardRef} className="relative w-full aspect-[1.58/1] max-w-md bg-[#080808] rounded-[2.5rem] p-10 border border-white/20 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center border border-white/10"><Layers size={20} className="text-cyan-500" /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-cyan-400">Black Pass</p>
                        <p className="text-[8px] font-mono text-white/30 italic">ID: {data.id}</p>
                      </div>
                    </div>
                    <ShieldCheck className="text-white/20" size={28} />
                  </div>
                  <div className="text-left"><p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] italic">Identity Class</p><h2 className="text-4xl md:text-5xl font-black italic text-white uppercase">{data.status}</h2></div>
                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="text-left"><p className="text-[8px] font-mono text-white/20 uppercase italic">Net Worth</p><div className="flex items-baseline gap-1"><span className="text-4xl font-black">{data.sol}</span><span className="text-xs text-cyan-400 italic">SOL</span></div></div>
                    <div className="text-right"><p className="text-[8px] font-mono text-white/20 uppercase italic">Status</p><p className="text-xs font-black text-white/80 tracking-tighter uppercase">Verified Node</p></div>
                  </div>
                </div>
              </div>
              <button onClick={saveCard} className="flex items-center gap-4 bg-white/5 border border-white/10 px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"><Download size={16} /> Export Identity Pass</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-32 pt-10 border-t border-white/5 pb-20">
           <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest mb-8 opacity-20">
              <span>Solana</span><span>Jupiter</span><span>Helius</span>
           </div>
           <p className="text-[10px] font-mono tracking-[0.5em] uppercase italic text-gray-500">System Architected by <span className="text-white underline decoration-cyan-500/50">Bader Alkorgli</span></p>
        </div>
      </div>

      {/* --- Floating Chat Widget --- */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-all">
          {isChatOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="absolute bottom-20 right-0 w-[300px] md:w-[380px] h-[450px] md:h-[550px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl">
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <Bot size={18} className="text-cyan-500"/><h5 className="text-[10px] font-black uppercase tracking-widest">Wagmi Intelligence</h5>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[11px] font-mono scrollbar-hide">
                {chatHistory.length === 0 && <p className="text-gray-600 text-center mt-20 italic">Ask Wagmi in English...</p>}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && <div className="text-[9px] text-cyan-500 font-mono animate-pulse">Gemini is thinking...</div>}
              </div>
              <div className="p-4 bg-black border-t border-white/5 flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none focus:border-cyan-500 text-white" placeholder="Type in English..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} />
                <button onClick={handleChat} className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shrink-0"><Send size={16} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}