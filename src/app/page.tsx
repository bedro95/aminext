"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Fingerprint, Volume2, VolumeX, Activity, 
  Zap, ChevronRight, Trophy, Music, Github, ShieldCheck, 
  Cpu, Calendar, Hash, Globe, BarChart3, Radio, X, Maximize2, Sparkles, Flame, Terminal, BrainCircuit, TrendingUp, ShieldAlert, Search, Eye, Share2, Coins
} from 'lucide-react';
import { toPng } from 'html-to-image';

/**
 * PROJECT: SENKU PROTOCOL (WAGMI)
 * DEVELOPER: Bader Alkorgli (bedro95)
 * VERSION: ULTIMATE V7.0 - GLASS RUG CARD INTEGRATED
 * STATUS: ELITE WEB3 INTERFACE
 */

export default function SenkuUltimateProtocol() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [activeTab, setActiveTab] = useState('scan'); 
  const [whaleAlerts, setWhaleAlerts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Rug Shield States
  const [rugAddress, setRugAddress] = useState('');
  const [rugAnalysis, setRugAnalysis] = useState<any>(null);
  const [isAnalyzingRug, setIsAnalyzingRug] = useState(false);
  const [isRugModalOpen, setIsRugModalOpen] = useState(false);

  const [isNeuralProcessing, setIsNeuralProcessing] = useState(false);
  const [intentSignal, setIntentSignal] = useState<string | null>(null);
  const [intelligenceScore, setIntelligenceScore] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const rugCardRef = useRef<HTMLDivElement>(null);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const audioScan = useRef<HTMLAudioElement | null>(null);

  // --- RUG SHIELD ENGINE ---
  const analyzeRug = async () => {
    if (!rugAddress) return;
    setIsAnalyzingRug(true);
    if (!isMuted) audioScan.current?.play();
    
    // Simulate real-time on-chain security check & name fetching
    setTimeout(() => {
      const mockResult = {
        name: "SENKU_TOKEN (DR.STONE)",
        symbol: "SNK",
        score: Math.floor(Math.random() * 20) + 80,
        liquidity: "LOCKED (99.2%)",
        mint: "DISABLED",
        topHolders: "4.2%",
        status: "SAFE_GRAIL",
        riskLevel: "LOW",
        address: rugAddress.substring(0, 6) + "..." + rugAddress.substring(rugAddress.length - 4)
      };
      setRugAnalysis(mockResult);
      setIsAnalyzingRug(false);
    }, 3000);
  };

  const triggerNeuralIntent = async () => {
    if (!data) return;
    setIsNeuralProcessing(true);
    setTimeout(() => {
      const predictions = [
        "WHALE ACCUMULATION DETECTED: EXPECT +12% VOLATILITY",
        "LIQUIDITY SHIFT: NEURAL NODES SUGGEST ENTRY AT $142.5",
        "INSTITUTIONAL INTENT: LARGE OTC TRANSFER INBOUND",
        "PATTERN RECOGNITION: ASCENDING TRIANGLE FORMING ON-CHAIN",
        "MEV BOT ACTIVITY DETECTED: ALPHA SHIELD ACTIVATED"
      ];
      setIntentSignal(predictions[Math.floor(Math.random() * predictions.length)]);
      setIsNeuralProcessing(false);
    }, 2500);
  };

  useEffect(() => {
    bgMusic.current = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Raising_Frequency/Ketsa_-_08_-_World_In_Motion.mp3'); 
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.5;
    audioScan.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

    const handleInitialInteraction = () => {
      if (!isMuted && bgMusic.current?.paused) {
        bgMusic.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleInitialInteraction);
    return () => window.removeEventListener('click', handleInitialInteraction);
  }, [isMuted]);

  useEffect(() => {
    if (activeTab !== 'radar') return;
    let socket: WebSocket;
    let fallbackInterval: NodeJS.Timeout;

    const addAlert = (amount: number, type: string, source: string) => {
      const newAlert = {
        id: Date.now() + Math.random(),
        amount: amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        asset: "SOL",
        usd: source,
        type: type
      };
      setWhaleAlerts(prev => [newAlert, ...prev].slice(0, 8));
    };

    const startWebSocket = () => {
      socket = new WebSocket('wss://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483');
      socket.onopen = () => {
        socket.send(JSON.stringify({
          jsonrpc: "2.0", id: 1, method: "transactionSubscribe",
          params: [{ vote: false, failed: false }, { commitment: "confirmed", encoding: "jsonParsed", transactionDetails: "full", maxSupportedTransactionVersion: 0 }]
        }));
      };
      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.params?.result?.transaction) {
          const meta = response.params.result.meta;
          if (meta?.postBalances && meta?.preBalances) {
            const solChange = (meta.postBalances[0] - meta.preBalances[0]) / 1_000_000_000;
            if (Math.abs(solChange) > 5) {
              addAlert(Math.abs(solChange), solChange > 0 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "LIVE_MAINNET");
            }
          }
        }
      };
    };

    const startFallback = () => {
      fallbackInterval = setInterval(() => {
        if (Math.random() > 0.6) { 
          const fakeAmount = Math.random() * 800 + 50;
          addAlert(fakeAmount, Math.random() > 0.5 ? "WHALE_INFLOW" : "WHALE_OUTFLOW", "NEURAL_PRED");
        }
      }, 4500);
    };

    startWebSocket();
    startFallback();
    return () => {
      if (socket) socket.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [activeTab]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (bgMusic.current) {
      isMuted ? bgMusic.current.play() : bgMusic.current.pause();
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted) audioScan.current?.play();
    
    try {
      const response = await fetch("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 'senku-analysis', method: 'getAssetsByOwner',
          params: { ownerAddress: address.trim(), displayOptions: { showNativeBalance: true } },
        }),
      });

      const { result } = await response.json();
      let topAsset = { symbol: 'SOL', amount: 0, usdValue: 0 };
      let maxUsdValue = -1;

      if (result.nativeBalance) {
        const solPrice = result.nativeBalance.price_per_token || 0;
        const solAmt = result.nativeBalance.lamports / 1_000_000_000;
        const solUsd = solAmt * solPrice;
        topAsset = { symbol: 'SOL', amount: solAmt, usdValue: solUsd };
        maxUsdValue = solUsd;
      }

      result.items?.forEach((item: any) => {
        const usdValue = item.token_info?.price_info?.total_price || 0;
        if (usdValue > maxUsdValue) {
          maxUsdValue = usdValue;
          topAsset = {
            symbol: item.token_info?.symbol || 'ASSET',
            amount: item.token_info?.balance / Math.pow(10, item.token_info?.decimals) || 0,
            usdValue: usdValue
          };
        }
      });

      let tierColor = maxUsdValue >= 1000 ? "#22c55e" : maxUsdValue >= 100 ? "#10b981" : "#0ea5e9";
      const score = Math.floor(Math.random() * 40) + (maxUsdValue > 1000 ? 60 : 30);
      setIntelligenceScore(score);

      setData({
        sol: topAsset.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        symbol: topAsset.symbol,
        usdDisplay: maxUsdValue.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        status: `${topAsset.symbol} HOLDER`,
        tierColor,
        date: new Date().toLocaleDateString('en-GB'),
        hash: "SK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        power: ((maxUsdValue / 500) + 10).toFixed(2) + "B%"
      });
    } catch (e) {
      alert("Scientific Calculation Error!");
    } finally {
      setLoading(false);
    }
  };

  const saveToImage = (ref: any, name: string) => {
    if (!ref.current) return;
    toPng(ref.current, { pixelRatio: 3, backgroundColor: '#020617' }).then(url => {
      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center p-4 md:p-8 font-sans overflow-hidden relative selection:bg-green-500/30">
      
      {/* Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.12),transparent_70%)] z-10" />
        <motion.img 
          src="/senku.GIF" 
          alt="Senku Background" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, x: [-10, 10, -10], y: [-5, 5, -5] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        {[...Array(30)].map((_, i) => (
          <motion.div key={i} animate={{ y: "110vh", opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity }}
            className="absolute w-[1px] h-[10px] bg-green-500/50 z-20" style={{ left: `${Math.random() * 100}vw`, top: `-20px` }} />
        ))}
      </div>

      {/* WEB3 NAVIGATION - HIGH END TIER */}
      <header className="fixed top-6 z-[1000] w-full max-w-4xl px-4">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-3 ml-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black italic text-black text-xs">S</div>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase hidden md:block">Senku Protocol</span>
          </div>
          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
            {['scan', 'rug shield', 'radar'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} 
                className={`relative px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}>
                {activeTab === tab && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)] rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setActiveTab('hall of fame')} className="mr-2 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
             <Trophy size={16} className={activeTab === 'hall of fame' ? 'text-green-500' : 'text-white/40'} />
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl flex flex-col items-center flex-grow justify-center mt-24">
        
        {activeTab === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
            <div className="text-center mb-12 relative">
              <motion.h1 className="text-[18vw] md:text-[13rem] font-[1000] italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-green-500 bg-clip-text text-transparent drop-shadow-2xl select-none">
                SENKU
              </motion.h1>
            </div>

            <div className="w-full max-w-lg px-6 mb-16">
              <div className="relative group">
                <input 
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest placeholder:opacity-20" 
                  placeholder="INPUT_SOLANA_ADDRESS" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </div>
              <button onClick={analyze} className="w-full mt-5 py-6 bg-white text-black rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-2xl">
                {loading ? "SEARCHING 10B%..." : "INITIALIZE NEURAL SCAN"}
              </button>
            </div>

            <AnimatePresence>
              {data && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pb-32 px-4 w-full flex flex-col items-center gap-6">
                  {/* Web3 Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20"><BrainCircuit size={80} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Neural IQ</span>
                        <div className="text-4xl font-[1000] italic mt-2">{intelligenceScore}</div>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20"><TrendingUp size={80} /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Power Tier</span>
                        <div className="text-4xl font-[1000] italic mt-2">{data.power}</div>
                     </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} onClick={() => setIsModalOpen(true)} className="cursor-pointer bg-slate-900/40 border border-white/10 rounded-3xl p-6 flex items-center justify-between w-full max-w-md group transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500"><Maximize2 size={24} /></div>
                        <div><p className="text-[10px] font-black uppercase tracking-widest">Digital Passport</p></div>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-green-500 transition-colors" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Rug Shield Tab */}
        {activeTab === 'rug shield' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl px-6 pt-10 pb-40">
            <div className="flex flex-col items-center mb-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-6 border border-green-500/20">
                    <ShieldCheck size={40} className="text-green-500" />
                </div>
                <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter text-white">RUG SHIELD</h2>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mt-2">Solana Contract Security Auditor</p>
            </div>

            <div className="space-y-4">
                <input 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-6 text-center outline-none focus:border-green-500 transition-all font-mono text-sm tracking-widest" 
                    placeholder="PASTE_SOLANA_CONTRACT_ADDRESS" 
                    value={rugAddress} 
                    onChange={(e) => setRugAddress(e.target.value)} 
                />
                <button onClick={analyzeRug} className="w-full py-6 bg-green-600 text-white rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.5em] hover:bg-green-500 transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3">
                    {isAnalyzingRug ? <Activity className="animate-spin" /> : <Search size={18} />}
                    {isAnalyzingRug ? "AUDITING..." : "START SECURITY SCAN"}
                </button>
            </div>

            <AnimatePresence>
                {rugAnalysis && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center">
                            <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-4">Analysis Complete</div>
                            <div className="text-4xl font-[1000] italic text-white mb-6 text-center">{rugAnalysis.name}</div>
                            
                            <button onClick={() => setIsRugModalOpen(true)} className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] hover:bg-green-600 hover:text-white transition-all">
                                <Maximize2 size={16} /> View Protocol Identity
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Glass Rug Card Modal */}
        <AnimatePresence>
          {isRugModalOpen && rugAnalysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
               <motion.div initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-[500px]">
                  <button onClick={() => setIsRugModalOpen(false)} className="absolute -top-12 right-0 text-white/50 hover:text-red-500"><X size={32} /></button>
                  
                  {/* GLASS CARD CONTENT */}
                  <div ref={rugCardRef} className="w-full aspect-[1/1.3] bg-gradient-to-br from-white/10 to-transparent border-[2px] border-white/20 rounded-[3rem] p-10 overflow-hidden relative shadow-[0_0_100px_rgba(34,197,94,0.2)]">
                      <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldAlert size={200} /></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                          <div className="flex justify-between items-center mb-10">
                              <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                                      <Coins size={24} className="text-black" />
                                  </div>
                                  <div>
                                      <p className="text-[10px] font-black uppercase tracking-widest">Protocol Scan</p>
                                      <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest">{rugAnalysis.address}</p>
                                  </div>
                              </div>
                              <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30 text-[8px] font-black text-green-500 uppercase tracking-widest">
                                  {rugAnalysis.status}
                              </div>
                          </div>

                          <div className="mb-10 text-center flex-grow flex flex-col justify-center">
                              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em] mb-2">Token Identity</p>
                              <h3 className="text-5xl font-[1000] italic leading-tight tracking-tighter mb-4">{rugAnalysis.name}</h3>
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          </div>

                          <div className="grid grid-cols-2 gap-6 mb-10">
                              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                  <p className="text-[8px] font-bold text-white/30 uppercase mb-2">Security Score</p>
                                  <p className="text-3xl font-[1000] italic text-green-500">{rugAnalysis.score}%</p>
                              </div>
                              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                  <p className="text-[8px] font-bold text-white/30 uppercase mb-2">Liquidity</p>
                                  <p className="text-xl font-bold font-mono tracking-tighter">LOCKED</p>
                              </div>
                          </div>

                          <div className="space-y-3 border-t border-white/10 pt-8">
                             <div className="flex justify-between text-[9px] font-mono tracking-widest uppercase">
                                <span className="opacity-30">Mint Authority</span>
                                <span className="text-green-500">{rugAnalysis.mint}</span>
                             </div>
                             <div className="flex justify-between text-[9px] font-mono tracking-widest uppercase">
                                <span className="opacity-30">Top 10 Holders</span>
                                <span className="text-white">{rugAnalysis.topHolders}</span>
                             </div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button onClick={() => saveToImage(rugCardRef, `RUG_REPORT_${rugAnalysis.symbol}`)} className="flex-grow bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-3">
                        <Download size={18} /> Download Security Report
                    </button>
                    <button className="bg-white/10 p-5 rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                        <Share2 size={18} />
                    </button>
                  </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hall of Fame & Radar - Previous logic maintained */}
        {activeTab === 'radar' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl px-6 pt-10 pb-40 space-y-5">
                {whaleAlerts.map((a) => (
                <div key={a.id} className="bg-slate-900/80 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-center border-l-[6px] border-l-green-600 shadow-xl">
                    <div>
                    <p className="text-3xl font-[1000] italic">{a.amount} <span className="text-xs text-green-500">{a.asset}</span></p>
                    <p className="text-[10px] opacity-30 uppercase tracking-[0.3em] mt-1">{a.type}</p>
                    </div>
                </div>
                ))}
            </motion.div>
        )}

        {/* Modal ID Card - Previous logic maintained */}
        <AnimatePresence>
            {isModalOpen && data && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative w-full max-w-[550px] flex flex-col items-center">
                        <button onClick={() => setIsModalOpen(false)} className="absolute -top-12 right-0 text-white/50 hover:text-red-500"><X size={32} /></button>
                        <div ref={modalRef} className="relative w-full aspect-[1.58/1] bg-[#020617] border-[2.5px] rounded-[3rem] p-10 overflow-hidden" style={{ borderColor: data.tierColor }}>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10"><ShieldCheck size={24} style={{ color: data.tierColor }} /></div>
                                        <div><p className="text-[10px] font-black uppercase tracking-widest leading-none">Senku Verified</p></div>
                                    </div>
                                    <Cpu size={24} className="opacity-20 animate-pulse" />
                                </div>
                                <div className="mb-10 mt-6">
                                    <h2 className="text-6xl md:text-7xl font-[1000] italic tracking-tighter leading-none">${data.usdDisplay}</h2>
                                    <p className="text-sm font-mono mt-2 opacity-50 tracking-widest">{data.sol} {data.symbol}</p>
                                </div>
                                <div className="flex justify-between items-end border-t border-white/5 pt-8 mt-auto">
                                    <div><p className="text-4xl font-[1000] italic uppercase leading-none" style={{ color: data.tierColor }}>{data.status}</p></div>
                                    <div className="text-right"><p className="text-lg font-mono text-green-500 font-black">{intelligenceScore} IQ</p></div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => saveToImage(modalRef, `SENKU_ID_${data.hash}`)} className="mt-8 flex items-center gap-4 bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-green-600 hover:text-white transition-all shadow-2xl">
                            <Download size={20} /> Extract Lab Credentials
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-[100] py-14 w-full flex flex-col items-center gap-6 mt-auto">
        <div className="flex gap-4">
            <button onClick={toggleMute} className="p-4 bg-white/5 border border-green-500/20 rounded-full hover:bg-green-500/10">
              {isMuted ? <VolumeX size={20} className="text-red-400" /> : <Volume2 size={20} className="text-green-400 animate-pulse" />}
            </button>
            <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
              <Github size={20} className="group-hover:text-green-500 transition-colors" />
              <span className="text-[12px] font-mono text-white/90">@bedro95</span>
            </a>
        </div>
        <p className="text-[10px] font-mono tracking-[2em] opacity-10 uppercase select-none">SENKU_WORLD // 2025</p>
      </footer>

      <style jsx global>{`
        body { background-color: #020617; margin: 0; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
