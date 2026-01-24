"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Radar, Search, Map, Activity, 
  TrendingUp, TrendingDown, Info, Fingerprint,
  Zap, Radio, Bell, Target, Lock, Unlock,
  Wifi, Database, Server, Terminal
} from "lucide-react";

const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "SENKU01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#00FFCC";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
};

const PulsingOrb = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#00FFCC] rounded-full animate-ping opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] rounded-full blur-xl opacity-50 animate-pulse" />
      <div className="relative w-full h-full bg-[#00FFCC] rounded-full shadow-[0_0_30px_rgba(0,255,204,0.8)]" />
    </div>
  );
};

const LiveMetricsBar = () => {
  const [metrics, setMetrics] = useState({
    tps: 0,
    activeValidators: 0,
    networkLoad: 0,
    avgBlockTime: 0
  });
  
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        tps: Math.floor(2000 + Math.random() * 1500),
        activeValidators: 1800 + Math.floor(Math.random() * 200),
        networkLoad: 40 + Math.floor(Math.random() * 40),
        avgBlockTime: 400 + Math.floor(Math.random() * 50)
      });
    };
    
    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-black/80 backdrop-blur-xl border-y border-[#00FFCC]/30 py-3 px-6">
      <div className="flex items-center justify-between gap-4 text-xs font-mono flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse" />
          <span className="text-white/60">TPS:</span>
          <span className="text-[#00FFCC] font-bold">{metrics.tps.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Server className="w-3 h-3 text-[#00E0FF]" />
          <span className="text-white/60">Validators:</span>
          <span className="text-[#00E0FF] font-bold">{metrics.activeValidators}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-yellow-400" />
          <span className="text-white/60">Load:</span>
          <span className="text-yellow-400 font-bold">{metrics.networkLoad}%</span>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = () => {
  const [logs, setLogs] = useState([
    "> Initializing Senku Protocol...",
    "> System ready."
  ]);
  const [input, setInput] = useState("");
  
  const handleCommand = (cmd) => {
    const responses = {
      "scan": "> Initiating scan...",
      "status": "> All systems operational.",
      "help": "> Commands: scan, status, help, clear",
      "clear": "CLEAR"
    };
    
    const response = responses[cmd.toLowerCase()] || `> Unknown: ${cmd}`;
    
    if (response === "CLEAR") {
      setLogs([]);
    } else {
      setLogs(prev => [...prev.slice(-5), `$ ${cmd}`, response]);
    }
  };
  
  return (
    <div className="bg-black/90 rounded-2xl border border-[#00FFCC]/30 p-6 font-mono text-xs">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-4 h-4 text-[#00FFCC]" />
        <span className="text-[#00FFCC]">SENKU_TERMINAL</span>
      </div>
      
      <div className="space-y-1 mb-4 max-h-40 overflow-y-auto">
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
            if (e.key === "Enter") {
              handleCommand(input);
              setInput("");
            }
          }}
          className="flex-1 bg-transparent outline-none text-white"
          placeholder="type help"
        />
      </div>
    </div>
  );
};

export default function SenkuPage() {
  const [activeTab, setActiveTab] = useState("terminal");
  const [isConnected, setIsConnected] = useState(false);
  
  const tabs = [
    { id: "scan", label: "Scanner", icon: Search },
    { id: "audit", label: "Audit", icon: Shield },
    { id: "radar", label: "Radar", icon: Radar },
    { id: "terminal", label: "Terminal", icon: Terminal }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />
      
      <LiveMetricsBar />
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-[#00FFCC]/30">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16">
              <PulsingOrb className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white">
                SENKU <span className="text-[#00FFCC]">PROTOCOL</span>
              </h1>
              <p className="text-sm text-white/60 font-mono mt-1">
                Advanced Blockchain Intelligence
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
              isConnected 
                ? "bg-green-500/20 border-2 border-green-500 text-green-400" 
                : "bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC]"
            }`}
          >
            {isConnected ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                  activeTab === tab.id
                    ? "bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC]"
                    : "bg-black/40 border-2 border-white/10 text-white/60"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-[#00FFCC]/30 p-8">
          {activeTab === "terminal" ? (
            <TerminalWindow />
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <PulsingOrb className="w-full h-full" />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-white/60">Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative z-10 mt-12 py-6 border-t border-white/10 text-center text-white/40 text-sm font-mono">
        <div className="flex items-center justify-center gap-2">
          <Activity className="w-4 h-4 animate-pulse text-[#00FFCC]" />
          SENKU Protocol • Built by Bader
        </div>
      </div>
    </div>
  );
}
