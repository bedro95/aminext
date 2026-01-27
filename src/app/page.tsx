"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Radar, Search, Activity, TrendingUp, TrendingDown, Lock, Unlock,
  Server, Terminal, Bell, Target, Zap, Radio, AlertCircle, CheckCircle, 
  XCircle, Menu, X, ChevronRight, Rocket, Database, Users, Sparkles,
  Eye, Flame, Award, BarChart3, Globe, Cpu, Download, Share2, Star,
  ArrowUpRight, Fingerprint, Volume2, VolumeX, Brain
} from "lucide-react";

const useAudio = () => {
  const [muted, setMuted] = useState(false);
  
  const playSound = (type) => {
    if (muted || typeof window === 'undefined') return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const sounds = {
        click: { freq: 800, duration: 50 },
        scan: { freq: 600, duration: 100 },
        success: { freq: 1200, duration: 150 },
        hover: { freq: 500, duration: 30 }
      };
      
      const sound = sounds[type] || sounds.click;
      oscillator.frequency.value = sound.freq;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), sound.duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };
  
  return { playSound, muted, setMuted };
};

const ParticleField3D = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1500,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 3,
      color: Math.random() > 0.5 ? [138, 43, 226] : [6, 182, 212]
    }));
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.z < 0 || p.z > 1500) p.vz *= -1;
        
        const scale = 1500 / (1500 + p.z);
        const x2d = p.x * scale + canvas.width / 2 * (1 - scale);
        const y2d = p.y * scale + canvas.height / 2 * (1 - scale);
        const size = 3 * scale;
        
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 5);
        gradient.addColorStop(0, `rgba(${p.color.join(',')}, ${scale * 0.8})`);
        gradient.addColorStop(1, `rgba(${p.color.join(',')}, 0)`);
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        particles.slice(i + 1, i + 4).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dz = p.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 200) {
            const scale2 = 1500 / (1500 + p2.z);
            const x2d2 = p2.x * scale2 + canvas.width / 2 * (1 - scale2);
            const y2d2 = p2.y * scale2 + canvas.height / 2 * (1 - scale2);
            
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.strokeStyle = `rgba(${p.color.join(',')}, ${0.15 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    tps: 3842,
    validators: 2047,
    tvl: "7.2B",
    users: "312K",
    scans: 18467,
    threats: 143
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        tps: Math.floor(3200 + Math.random() * 1800),
        validators: 1950 + Math.floor(Math.random() * 200),
        tvl: (6.5 + Math.random() * 3).toFixed(1) + "B",
        users: (300 + Math.floor(Math.random() * 30)) + "K",
        scans: prev.scans + Math.floor(Math.random() * 7),
        threats: prev.threats + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  
  const metricsData = [
    { label: "TPS", value: metrics.tps.toLocaleString(), gradient: "from-purple-500 to-purple-600", icon: Zap },
    { label: "Validators", value: metrics.validators, gradient: "from-cyan-500 to-cyan-600", icon: Server },
    { label: "TVL", value: "$" + metrics.tvl, gradient: "from-green-500 to-green-600", icon: Database },
    { label: "Users", value: metrics.users, gradient: "from-yellow-500 to-yellow-600", icon: Users },
    { label: "Scans", value: metrics.scans.toLocaleString(), gradient: "from-blue-500 to-blue-600", icon: Search },
    { label: "Blocked", value: metrics.threats, gradient: "from-red-500 to-red-600", icon: Shield }
  ];
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-950/80 via-black/90 to-cyan-950/80 backdrop-blur-2xl border-b border-purple-500/30 py-3 px-3 md:px-6 overflow-x-auto scrollbar-hide shadow-lg">
      <div className="flex items-center justify-center gap-3 md:gap-6 text-[9px] md:text-xs font-mono whitespace-nowrap">
        {metricsData.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="flex items-center gap-1.5 md:gap-2 group">
              <div className={`p-1 md:p-1.5 rounded-lg bg-gradient-to-br ${m.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:gap-1.5">
                <span className="text-white/50 text-[8px] md:text-xs">{m.label}</span>
                <span className="font-bold text-white tabular-nums">{m.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PriceTicker = () => {
  const [prices, setPrices] = useState({
    SOL: { price: 189.34, change: 4.2, volume: "2.8B" },
    JUP: { price: 0.8712, change: -2.1, volume: "167M" },
    RAY: { price: 4.89, change: 7.8, volume: "94M" },
    BONK: { price: 0.00002456, change: 18.4, volume: "267M" },
    ORCA: { price: 3.42, change: -1.7, volume: "73M" },
    PYTH: { price: 0.67, change: 5.3, volume: "112M" }
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const updated = {};
        Object.keys(prev).forEach(key => {
          const volatility = key === 'BONK' ? 0.03 : key === 'JUP' ? 0.015 : 0.01;
          updated[key] = {
            ...prev[key],
            price: Math.max(0, prev[key].price + (Math.random() - 0.5) * prev[key].price * volatility),
            change: (Math.random() - 0.5) * 12
          };
        });
        return updated;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  
  const allPrices = [...Object.entries(prices), ...Object.entries(prices), ...Object.entries(prices)];
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-950/60 via-black/80 to-cyan-950/60 border-b border-purple-500/20 py-2.5 overflow-hidden shadow-inner">
      <div className="flex animate-ticker-slow whitespace-nowrap">
        {allPrices.map(([symbol, data], idx) => {
          const Icon = data.change > 0 ? TrendingUp : TrendingDown;
          const colorClass = data.change > 0 ? 'text-green-400' : 'text-red-400';
          const bgClass = data.change > 0 ? 'bg-green-500/10' : 'bg-red-500/10';
          
          return (
            <div key={idx} className={`inline-flex items-center gap-2 mx-5 px-3 py-1.5 rounded-lg ${bgClass} border border-white/5 text-[10px] md:text-xs font-mono hover:scale-105 transition-transform`}>
              <span className="text-purple-300 font-bold">{symbol}</span>
              <span className="text-white font-bold tabular-nums">
                ${symbol === 'BONK' ? data.price.toFixed(8) : symbol === 'JUP' || symbol === 'PYTH' ? data.price.toFixed(4) : data.price.toFixed(2)}
              </span>
              <span className={`flex items-center gap-0.5 ${colorClass} font-semibold`}>
                <Icon className="w-3 h-3" />
                {Math.abs(data.change).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const QuantumScanner = ({ playSound }) => {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  
  const handleScan = () => {
    if (!address) return;
    playSound('scan');
    setScanning(true);
    setProgress(0);
    setResult(null);
    
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 4;
      });
    }, 90);
    
    setTimeout(() => {
      const score = Math.floor(62 + Math.random() * 38);
      const isSafe = score > 82;
      
      setResult({
        status: isSafe ? "safe" : score > 65 ? "warning" : "danger",
        score,
        address,
        holders: Math.floor(2000 + Math.random() * 8000),
        liquidity: "$" + (1 + Math.random() * 8).toFixed(2) + "M",
        volume24h: "$" + (2 + Math.random() * 15).toFixed(2) + "M",
        marketCap: "$" + (10 + Math.random() * 90).toFixed(1) + "M",
        checks: [
          { name: "Contract Verified", passed: true, detail: "✓ Source code on-chain" },
          { name: "Liquidity Locked", passed: isSafe, detail: isSafe ? "🔒 365 days" : "⚠️ Not locked" },
          { name: "Ownership Renounced", passed: Math.random() > 0.35, detail: "Status checked" },
          { name: "Honeypot Detection", passed: isSafe, detail: isSafe ? "✓ Clean" : "⚠️ Detected" },
          { name: "Mint Authority", passed: true, detail: "✓ Disabled" },
          { name: "Freeze Authority", passed: Math.random() > 0.25, detail: "Checked" }
        ],
        riskLevel: isSafe ? "LOW" : score > 65 ? "MEDIUM" : "HIGH",
        timestamp: new Date().toLocaleString()
      });
      
      playSound('success');
      setScanning(false);
    }, 2800);
  };
  
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50 p-6 md:p-10 border-2 border-purple-500/40 backdrop-blur-2xl shadow-2xl shadow-purple-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 md:p-5 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg">
              <Search className="w-7 h-7 md:w-9 md:h-9 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Quantum Scanner
              </h2>
              <p className="text-purple-300/80 text-xs md:text-sm flex items-center gap-2 mt-1">
                <Brain className="w-4 h-4" />
                AI-Powered Contract Analysis
              </p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="relative group">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Paste Solana contract address..."
                className="w-full px-5 md:px-7 py-4 md:py-6 bg-black/60 border-2 border-purple-500/40 rounded-2xl text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:shadow-2xl transition-all text-sm md:text-base font-mono"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            
            {scanning && (
              <div className="space-y-3">
                <div className="flex justify-between text-xs md:text-sm font-mono text-purple-300">
                  <span>Analyzing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <button
              onClick={handleScan}
              disabled={scanning || !address}
              className="w-full px-8 py-5 md:py-6 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black rounded-2xl hover:shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-sm md:text-lg"
            >
              {scanning ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-6 h-6" />
                  <span>Launch Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {result && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 border-2 border-purple-500/50 backdrop-blur-xl p-6 md:p-10">
          <div className="flex flex-col lg:flex-row justify-between mb-8 gap-6">
            <div className="flex items-start gap-5">
              <div className={`p-6 rounded-3xl ${result.status === 'safe' ? 'bg-green-500/20' : result.status === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                {result.status === 'safe' ? (
                  <CheckCircle className="w-12 h-12 text-green-400" />
                ) : result.status === 'warning' ? (
                  <AlertCircle className="w-12 h-12 text-yellow-400" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">Analysis Complete</h3>
                <p className="text-purple-300 text-xs md:text-sm">{result.timestamp}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-6xl font-black mb-2 ${result.status === 'safe' ? 'text-green-400' : result.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.score}
              </div>
              <div className="text-xs text-purple-300 mb-3">SECURITY SCORE</div>
              <div className={`px-5 py-2.5 rounded-xl text-sm font-black ${result.status === 'safe' ? 'bg-green-500/20 text-green-400' : result.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                {result.riskLevel} RISK
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Holders", value: result.holders.toLocaleString(), icon: Users },
              { label: "Liquidity", value: result.liquidity, icon: Database },
              { label: "Volume", value: result.volume24h, icon: BarChart3 },
              { label: "Market Cap", value: result.marketCap, icon: TrendingUp }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-black/50 border border-purple-500/30 rounded-xl p-4">
                  <Icon className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-xs text-purple-300/70 mb-1">{stat.label}</div>
                  <div className="text-xl font-black text-white">{stat.value}</div>
                </div>
              );
            })}
          </div>
          
          <div className="space-y-3">
            {result.checks.map((check, i) => (
              <div
                key={i}
                className="bg-black/50 border border-purple-500/20 rounded-xl p-4 hover:border-purple-400/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {check.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    )}
                    <div>
                      <p className="text-white font-bold text-sm mb-1">{check.name}</p>
                      <p className="text-purple-300/80 text-xs">{check.detail}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${check.passed ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {check.passed ? 'PASS' : 'FAIL'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SenkuProtocol() {
  const [activeTab, setActiveTab] = useState("scan");
  const [isConnected, setIsConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { playSound, muted, setMuted } = useAudio();
  
  const tabs = [
    { id: "scan", label: "Quantum Scanner", icon: Search, gradient: "from-purple-600 to-cyan-500" }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ParticleField3D />
      <LiveMetrics />
      <PriceTicker />
      
      <div className="relative z-10">
        <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-2xl border-b-2 border-purple-500/40 shadow-xl">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-4 md:py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-5">
                <div className="relative w-12 h-12 md:w-20 md:h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl animate-pulse blur-lg" />
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 rounded-3xl flex items-center justify-center font-black text-white text-xl md:text-4xl shadow-2xl">
                    S
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-5xl font-black">
                    <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                      SENKU
                    </span>
                  </h1>
                  <p className="text-[10px] md:text-sm text-purple-300 font-mono mt-1">Quantum Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={() => setMuted(!muted)}
                  className="p-2 md:p-3 bg-purple-500/20 border-2 border-purple-500/40 rounded-xl hover:bg-purple-500/30 transition-all"
                >
                  {muted ? <VolumeX className="w-4 h-4 text-purple-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
                </button>
                
                <button
                  onClick={() => {
                    setIsConnected(!isConnected);
                    playSound('success');
                  }}
                  className={`px-4 md:px-7 py-2.5 md:py-3.5 rounded-xl font-black flex items-center gap-2 transition-all text-xs md:text-sm ${
                    isConnected 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  }`}
                >
                  {isConnected ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isConnected ? 'Connected' : 'Connect'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-8 md:py-12">
          <QuantumScanner playSound={playSound} />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes ticker-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-slow {
          animation: ticker-slow 45s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
