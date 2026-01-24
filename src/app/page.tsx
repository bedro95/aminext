"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Radar, Search, Activity, 
  TrendingUp, TrendingDown, Lock, Unlock,
  Database, Server, Terminal, Bell, Target,
  Zap, Radio, Wifi, Menu, X, ChevronRight,
  AlertCircle, CheckCircle, XCircle
} from "lucide-react";

const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const chars = "SENKU01";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FFCC";
      ctx.font = fontSize + "px monospace";
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-10 z-0" />;
};

const AnimatedOrb = ({ className = "" }) => (
  <div className={"relative " + className}>
    <div className="absolute inset-0 bg-[#00FFCC] rounded-full animate-ping opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] rounded-full blur-md opacity-50 animate-pulse" />
    <div className="relative w-full h-full bg-[#00FFCC] rounded-full" />
  </div>
);

const MetricsBar = () => {
  const [metrics, setMetrics] = useState({ tps: 2847, validators: 1954, load: 67 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        tps: Math.floor(2000 + Math.random() * 1500),
        validators: 1800 + Math.floor(Math.random() * 200),
        load: 40 + Math.floor(Math.random() * 40)
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-black/90 backdrop-blur-xl border-b border-[#00FFCC]/20 py-2 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#00FFCC] rounded-full animate-pulse" />
          <span className="text-white/50">TPS</span>
          <span className="text-[#00FFCC] font-bold">{metrics.tps.toLocaleString()}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Server className="w-3 h-3 text-[#00E0FF]" />
          <span className="text-white/50">Val</span>
          <span className="text-[#00E0FF] font-bold">{metrics.validators}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-yellow-400" />
          <span className="text-white/50">Load</span>
          <span className="text-yellow-400 font-bold">{metrics.load}%</span>
        </div>
      </div>
    </div>
  );
};

const PriceTicker = () => {
  const prices = {
    SOL: { price: 185.42, change: 2.3 },
    JUP: { price: 0.8234, change: -1.2 },
    RAY: { price: 4.56, change: 5.7 }
  };
  
  const items = [...Object.entries(prices), ...Object.entries(prices)];
  
  return (
    <div className="w-full bg-black/80 border-b border-[#00FFCC]/10 py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map(([symbol, data], idx) => {
          const Icon = data.change > 0 ? TrendingUp : TrendingDown;
          const color = data.change > 0 ? "text-green-400" : "text-red-400";
          return (
            <div key={idx} className="inline-flex items-center gap-2 mx-6 text-xs font-mono">
              <span className="text-white/40">{symbol}</span>
              <span className="text-[#00FFCC] font-bold">
                ${symbol === "JUP" ? data.price.toFixed(4) : data.price.toFixed(2)}
              </span>
              <span className={color + " flex items-center gap-0.5"}>
                <Icon className="w-2.5 h-2.5" />
                {Math.abs(data.change).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ScannerTab = () => {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleScan = () => {
    if (!address) return;
    setScanning(true);
    setTimeout(() => {
      const isSafe = Math.random() > 0.3;
      setResult({
        status: isSafe ? "safe" : "warning",
        score: Math.floor(60 + Math.random() * 40),
        checks: [
          { name: "Contract Verification", passed: true },
          { name: "Liquidity Lock", passed: isSafe },
          { name: "Ownership Renounced", passed: Math.random() > 0.5 },
          { name: "No Honeypot", passed: isSafe }
        ]
      });
      setScanning(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-[#00FFCC]/5 to-transparent p-4 md:p-6 rounded-2xl border border-[#00FFCC]/20">
        <h2 className="text-xl md:text-2xl font-black mb-2">Contract Scanner</h2>
        <p className="text-white/60 text-xs md:text-sm mb-4">Deep analysis of Solana contracts</p>
        
        <div className="space-y-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter contract address..."
            className="w-full px-4 py-3 bg-black/60 border border-[#00FFCC]/30 rounded-xl text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#00FFCC]"
          />
          
          <button
            onClick={handleScan}
            disabled={scanning || !address}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] text-black font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {scanning ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Start Scan
              </>
            )}
          </button>
        </div>
      </div>
      
      {result && (
        <div className="bg-black/60 p-4 md:p-6 rounded-2xl border border-[#00FFCC]/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {result.status === "safe" ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              )}
              <div>
                <h3 className="text-lg font-bold">Scan Complete</h3>
                <p className={"text-xs " + (result.status === "safe" ? "text-green-400" : "text-yellow-400")}>
                  {result.status === "safe" ? "Safe" : "Warning"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-black text-[#00FFCC]">{result.score}</div>
              <div className="text-[10px] text-white/60">SCORE</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {result.checks.map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-white/80 text-xs md:text-sm">{check.name}</span>
                {check.passed ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const RadarTab = () => {
  const [whales, setWhales] = useState([
    { address: "7xKX...9mPq", amount: "1.2M", action: "buy", time: "2m" },
    { address: "5nQp...4kLm", amount: "890K", action: "sell", time: "5m" }
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newWhale = {
        address: Math.random().toString(36).substr(2, 4) + "..." + Math.random().toString(36).substr(2, 4),
        amount: (Math.random() * 3).toFixed(1) + "M",
        action: Math.random() > 0.5 ? "buy" : "sell",
        time: "now"
      };
      setWhales(prev => [newWhale, ...prev.slice(0, 9)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-500/5 to-transparent p-4 md:p-6 rounded-2xl border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black">Whale Radar</h2>
            <p className="text-white/60 text-xs md:text-sm">Live transactions</p>
          </div>
          <Radio className="w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-2">
        {whales.map((whale, i) => (
          <div key={i} className="bg-black/60 p-3 md:p-4 rounded-xl border border-purple-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <Target className={"w-4 h-4 " + (whale.action === "buy" ? "text-green-400" : "text-red-400")} />
                <div>
                  <p className="text-white/90 font-mono text-xs md:text-sm">{whale.address}</p>
                  <p className="text-white/40 text-[10px]">{whale.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={"font-bold text-sm " + (whale.action === "buy" ? "text-green-400" : "text-red-400")}>
                  {whale.amount}
                </p>
                <p className="text-[10px] text-white/60">{whale.action.toUpperCase()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TerminalTab = () => {
  const [logs, setLogs] = useState([
    "> Senku Protocol initialized",
    "> All systems operational"
  ]);
  const [input, setInput] = useState("");
  
  const handleCommand = (cmd) => {
    const commands = {
      "scan": "> Running scan...",
      "whale": "> Activating radar...",
      "status": "> Network: ONLINE",
      "help": "> Commands: scan, whale, status, clear",
      "clear": "CLEAR"
    };
    
    const response = commands[cmd.toLowerCase()] || "> Unknown: " + cmd;
    
    if (response === "CLEAR") {
      setLogs([]);
    } else {
      setLogs(prev => [...prev, "$ " + cmd, response].slice(-10));
    }
  };
  
  return (
    <div className="bg-black/90 rounded-2xl border border-[#00FFCC]/30 p-4 md:p-6 font-mono">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <Terminal className="w-4 h-4 text-[#00FFCC]" />
        <span className="text-[#00FFCC] text-xs md:text-sm">SENKU_TERMINAL</span>
      </div>
      
      <div className="space-y-1 mb-4 max-h-40 md:max-h-60 overflow-y-auto text-xs">
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith(">") ? "text-[#00FFCC]" : "text-white/60"}>
            {log}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-[#00FFCC]">$</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              handleCommand(input);
              setInput("");
            }
          }}
          className="flex-1 bg-transparent outline-none text-white text-xs md:text-sm"
          placeholder="type help"
        />
      </div>
    </div>
  );
};

export default function SenkuProtocol() {
  const [activeTab, setActiveTab] = useState("scan");
  const [isConnected, setIsConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const tabs = [
    { id: "scan", label: "Scanner", icon: Search },
    { id: "radar", label: "Radar", icon: Radar },
    { id: "terminal", label: "Terminal", icon: Terminal }
  ];
  
  const renderContent = () => {
    if (activeTab === "scan") return <ScannerTab />;
    if (activeTab === "radar") return <RadarTab />;
    if (activeTab === "terminal") return <TerminalTab />;
    return <ScannerTab />;
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      <MatrixRain />
      <MetricsBar />
      <PriceTicker />
      
      <div className="relative z-10">
        <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-[#00FFCC]/20">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative w-8 h-8 md:w-12 md:h-12">
                  <AnimatedOrb className="w-full h-full" />
                </div>
                <div>
                  <h1 className="text-lg md:text-3xl font-black">
                    SENKU <span className="text-[#00FFCC]">PRO</span>
                  </h1>
                  <p className="text-[8px] md:text-xs text-white/60 font-mono">Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className={"px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 text-xs transition-all " + (
                    isConnected 
                      ? "bg-green-500/20 border border-green-500 text-green-400" 
                      : "bg-[#00FFCC]/20 border border-[#00FFCC] text-[#00FFCC]"
                  )}
                >
                  {isConnected ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline text-xs">{isConnected ? "Connected" : "Connect"}</span>
                </button>
                
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 bg-white/5 rounded-lg"
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-xl z-30 p-4 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMenuOpen(false);
                  }}
                  className={"w-full p-4 rounded-xl font-bold flex items-center justify-between " + (
                    activeTab === tab.id
                      ? "bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC]"
                      : "bg-white/5 border-2 border-white/10 text-white/60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}
        
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-3">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={"p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all " + (
                    activeTab === tab.id
                      ? "bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC] shadow-lg"
                      : "bg-black/40 border-2 border-white/10 text-white/60"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {renderContent()}
        </div>
      </div>
      
      <div className="relative z-10 mt-8 py-4 border-t border-white/10 text-center text-white/40 text-[10px] md:text-xs font-mono">
        <div className="flex items-center justify-center gap-2">
          <Activity className="w-3 h-3 animate-pulse text-[#00FFCC]" />
          SENKU Protocol v5.0
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
