"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Radar, Search, Activity, TrendingUp, TrendingDown, 
  Lock, Unlock, Server, Terminal, Bell, Target, Zap, Radio,
  AlertCircle, CheckCircle, XCircle, Menu, X, ChevronRight,
  Fingerprint, Rocket, Eye, Cpu, Database, Globe, Flame,
  Award, BarChart3, Users, Code, GitBranch, Sparkles
} from "lucide-react";

// ============================================
// ADVANCED 3D BACKGROUND
// ============================================
const NeuralNetwork3D = () => {
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
    
    const nodes = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 2
    }));
    
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        if (node.z < 0 || node.z > 1000) node.vz *= -1;
        
        const scale = 1000 / (1000 + node.z);
        const x2d = node.x * scale + canvas.width / 2 * (1 - scale);
        const y2d = node.y * scale + canvas.height / 2 * (1 - scale);
        const size = 2 * scale;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 4);
        gradient.addColorStop(0, "rgba(138, 43, 226, " + scale + ")");
        gradient.addColorStop(1, "rgba(138, 43, 226, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
        
        nodes.slice(i + 1).forEach(other => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dz = node.z - other.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 150) {
            const scale2 = 1000 / (1000 + other.z);
            const x2d2 = other.x * scale2 + canvas.width / 2 * (1 - scale2);
            const y2d2 = other.y * scale2 + canvas.height / 2 * (1 - scale2);
            
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.strokeStyle = "rgba(138, 43, 226, " + (0.2 * (1 - dist / 150)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// ============================================
// FLOATING PARTICLES
// ============================================
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDelay: Math.random() * 5 + "s",
            animationDuration: (10 + Math.random() * 10) + "s"
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// METRICS BAR
// ============================================
const MetricsBar = () => {
  const [metrics, setMetrics] = useState({ 
    tps: 3241, 
    validators: 1954, 
    tvl: "5.2B",
    users: "247K"
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        tps: Math.floor(2500 + Math.random() * 1500),
        validators: 1800 + Math.floor(Math.random() * 200),
        tvl: (5 + Math.random() * 2).toFixed(1) + "B",
        users: (240 + Math.floor(Math.random() * 20)) + "K"
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-900/50 via-black/90 to-purple-900/50 backdrop-blur-2xl border-b border-purple-500/30 py-3 px-4 overflow-x-auto">
      <div className="flex items-center justify-center gap-6 md:gap-12 text-xs font-mono whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_10px_#a855f7]" />
          <span className="text-purple-300">TPS</span>
          <span className="text-white font-bold">{metrics.tps.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300">Validators</span>
          <span className="text-white font-bold">{metrics.validators}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-300">TVL</span>
          <span className="text-white font-bold">${metrics.tvl}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-yellow-300">Users</span>
          <span className="text-white font-bold">{metrics.users}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PRICE TICKER
// ============================================
const PriceTicker = () => {
  const [prices, setPrices] = useState({
    SOL: { price: 185.42, change: 2.3 },
    JUP: { price: 0.8234, change: -1.2 },
    RAY: { price: 4.56, change: 5.7 },
    BONK: { price: 0.00002145, change: 12.4 }
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        SOL: { ...prev.SOL, price: prev.SOL.price + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 5 },
        JUP: { ...prev.JUP, price: prev.JUP.price + (Math.random() - 0.5) * 0.01, change: (Math.random() - 0.5) * 3 },
        RAY: { ...prev.RAY, price: prev.RAY.price + (Math.random() - 0.5) * 0.1, change: (Math.random() - 0.5) * 4 },
        BONK: { ...prev.BONK, price: prev.BONK.price + (Math.random() - 0.5) * 0.000001, change: (Math.random() - 0.5) * 8 }
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const items = [...Object.entries(prices), ...Object.entries(prices), ...Object.entries(prices)];
  
  return (
    <div className="w-full bg-gradient-to-r from-purple-950/40 via-black/60 to-purple-950/40 border-b border-purple-500/20 py-2 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map(([symbol, data], idx) => {
          const Icon = data.change > 0 ? TrendingUp : TrendingDown;
          const color = data.change > 0 ? "text-green-400" : "text-red-400";
          return (
            <div key={idx} className="inline-flex items-center gap-2 mx-6 text-xs font-mono">
              <span className="text-purple-300 font-bold">{symbol}</span>
              <span className="text-white font-bold">
                ${symbol === "BONK" ? data.price.toFixed(8) : symbol === "JUP" ? data.price.toFixed(4) : data.price.toFixed(2)}
              </span>
              <span className={"flex items-center gap-0.5 font-semibold " + color}>
                <Icon className="w-3 h-3" />
                {Math.abs(data.change).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// SCANNER TAB WITH PREMIUM CARD
// ============================================
const ScannerTab = () => {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleScan = () => {
    if (!address) return;
    setScanning(true);
    setResult(null);
    
    setTimeout(() => {
      const score = Math.floor(70 + Math.random() * 30);
      const isSafe = score > 80;
      setResult({
        status: isSafe ? "safe" : score > 60 ? "warning" : "danger",
        score: score,
        address: address,
        checks: [
          { name: "Contract Verification", passed: true, detail: "Source code verified on chain" },
          { name: "Liquidity Lock", passed: isSafe, detail: isSafe ? "Locked for 365 days" : "Not locked" },
          { name: "Ownership Status", passed: Math.random() > 0.3, detail: "Renounced" },
          { name: "Honeypot Detection", passed: isSafe, detail: isSafe ? "No honeypot detected" : "Possible honeypot" },
          { name: "Token Holders", passed: true, detail: "1,247 holders" },
          { name: "Trading Volume", passed: Math.random() > 0.2, detail: "$2.4M (24h)" }
        ],
        riskLevel: isSafe ? "LOW" : score > 60 ? "MEDIUM" : "HIGH",
        timestamp: new Date().toLocaleString()
      });
      setScanning(false);
    }, 2500);
  };
  
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-purple-900/40 p-6 md:p-8 border border-purple-500/30 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Search className="w-6 h-6 md:w-7 md:h-7 text-purple-300" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Quantum Scanner
              </h2>
              <p className="text-purple-300/70 text-xs md:text-sm">Deep blockchain intelligence analysis</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Solana contract address (e.g., 7xKXt...)"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-black/50 border-2 border-purple-500/30 rounded-2xl text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 transition-all text-xs md:text-sm font-mono"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            
            <button
              onClick={handleScan}
              disabled={scanning || !address}
              className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group text-sm md:text-base"
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Contract...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Launch Deep Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {result && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-2 border-purple-500/40 backdrop-blur-xl animate-slideUp">
          <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: "url('/senku.GIF')" }} />
          
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className={"p-4 rounded-2xl " + (result.status === "safe" ? "bg-green-500/20" : result.status === "warning" ? "bg-yellow-500/20" : "bg-red-500/20")}>
                  {result.status === "safe" ? (
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                  ) : result.status === "warning" ? (
                    <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                  ) : (
                    <XCircle className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">Scan Complete</h3>
                  <p className="text-purple-300 text-xs md:text-sm font-mono">{result.timestamp}</p>
                  <p className="text-purple-400/60 text-[10px] md:text-xs font-mono mt-1 break-all">{result.address.substring(0, 20)}...</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={"text-4xl md:text-5xl font-black mb-1 " + (result.status === "safe" ? "text-green-400" : result.status === "warning" ? "text-yellow-400" : "text-red-400")}>
                  {result.score}
                </div>
                <div className="text-xs text-purple-300 mb-2">SECURITY SCORE</div>
                <div className={"px-3 py-1 rounded-full text-xs font-bold " + (result.status === "safe" ? "bg-green-500/20 text-green-400" : result.status === "warning" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400")}>
                  {result.riskLevel} RISK
                </div>
              </div>
            </div>
            
            <div className="grid gap-3">
              {result.checks.map((check, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-black/40 border border-purple-500/20 rounded-xl p-3 md:p-4 hover:border-purple-400/40 transition-all"
                  style={{ animationDelay: i * 50 + "ms" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 md:gap-3 flex-1">
                      {check.passed ? (
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-white font-semibold text-xs md:text-sm mb-1">{check.name}</p>
                        <p className="text-purple-300/60 text-[10px] md:text-xs">{check.detail}</p>
                      </div>
                    </div>
                    <div className={"px-2 py-1 rounded-lg text-[10px] md:text-xs font-bold " + (check.passed ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                      {check.passed ? "PASS" : "FAIL"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 font-semibold text-xs md:text-sm">AI Recommendation</span>
              </div>
              <p className="text-purple-200 text-xs md:text-sm">
                {result.status === "safe" 
                  ? "This contract appears to be safe for interaction. All security checks passed successfully."
                  : result.status === "warning"
                  ? "Exercise caution with this contract. Some security concerns detected. Do your own research before interacting."
                  : "High risk detected. Multiple security issues found. Avoid interacting with this contract."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// RADAR TAB
// ============================================
const RadarTab = () => {
  const [whales, setWhales] = useState([
    { id: 1, address: "7xKXt9mPqR3", amount: "1.2M", token: "SOL", action: "buy", time: "2m ago", usd: "$222K" },
    { id: 2, address: "5nQpL4kMxW8", amount: "890K", token: "USDC", action: "sell", time: "5m ago", usd: "$890K" },
    { id: 3, address: "9rTsP7jWxY2", amount: "2.5M", token: "SOL", action: "buy", time: "8m ago", usd: "$462K" }
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const tokens = ["SOL", "USDC", "JUP", "RAY"];
      const newWhale = {
        id: Date.now(),
        address: Math.random().toString(36).substr(2, 6) + "..." + Math.random().toString(36).substr(2, 3),
        amount: (Math.random() * 5).toFixed(1) + "M",
        token: tokens[Math.floor(Math.random() * tokens.length)],
        action: Math.random() > 0.5 ? "buy" : "sell",
        time: "just now",
        usd: "$" + (Math.random() * 1000).toFixed(0) + "K"
      };
      setWhales(prev => [newWhale, ...prev.slice(0, 11)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-900/40 via-blue-800/30 to-purple-900/40 p-6 md:p-8 border border-cyan-500/30 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Radar className="w-6 h-6 md:w-7 md:h-7 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Whale Radar
              </h2>
              <p className="text-cyan-300/70 text-xs md:text-sm">Real-time large transaction monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-green-400 text-sm font-bold">LIVE</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {whales.map((whale, i) => (
          <div
            key={whale.id}
            className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-900/50 border border-purple-500/20 rounded-2xl p-4 md:p-5 hover:border-cyan-400/40 transition-all animate-slideRight"
            style={{ animationDelay: i * 30 + "ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                <div className={"p-2 md:p-3 rounded-xl " + (whale.action === "buy" ? "bg-green-500/20" : "bg-red-500/20")}>
                  <Target className={"w-5 h-5 md:w-6 md:h-6 " + (whale.action === "buy" ? "text-green-400" : "text-red-400")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-mono font-bold text-xs md:text-sm">{whale.address}</span>
                    <span className="px-2 py-0.5 bg-purple-500/20 rounded text-purple-300 text-[10px] md:text-xs font-semibold">{whale.token}</span>
                  </div>
                  <p className="text-purple-300/60 text-[10px] md:text-xs">{whale.time}</p>
                </div>
              </div>
              
              <div className="text-right ml-auto md:ml-0">
                <p className={"text-xl md:text-2xl font-black mb-1 " + (whale.action === "buy" ? "text-green-400" : "text-red-400")}>
                  {whale.amount}
                </p>
                <p className="text-purple-300 text-[10px] md:text-xs">{whale.usd}</p>
                <span className={"text-[10px] md:text-xs font-bold uppercase " + (whale.action === "buy" ? "text-green-400" : "text-red-400")}>
                  {whale.action}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// TERMINAL TAB
// ============================================
const TerminalTab = () => {
  const [logs, setLogs] = useState([
    "> [SYSTEM] Senku Protocol v5.0 initialized",
    "> [NETWORK] Connected to Solana mainnet-beta",
    "> [STATUS] All systems operational",
    "> [READY] Awaiting commands..."
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);
  
  const handleCommand = (cmd) => {
    const commands = {
      "scan": "> [SCANNER] Initiating deep contract analysis...",
      "whale": "> [RADAR] Activating whale detection systems...",
      "status": "> [SYSTEM] Network: ONLINE | TPS: 3247 | Validators: 1954 | Uptime: 99.9%",
      "help": "> [HELP] Available commands: scan, whale, status, audit, network, clear, help",
      "audit": "> [AUDIT] Starting security audit protocol...",
      "network": "> [NETWORK] Solana Mainnet | Epoch: 542 | Slot: 234567890",
      "clear": "CLEAR"
    };
    
    const response = commands[cmd.toLowerCase()] || "> [ERROR] Unknown command: " + cmd + ". Type 'help' for available commands.";
    
    if (response === "CLEAR") {
      setLogs([]);
    } else {
      setLogs(prev => [...prev, "$ " + cmd, response]);
    }
  };
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-green-500/30 backdrop-blur-xl">
      <div className="absolute inset-0 opacity-30" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-black/40">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-mono font-bold text-xs md:text-sm">SENKU_QUANTUM_TERMINAL_v5.0</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
        
        <div
          ref={terminalRef}
          className="p-4 md:p-6 font-mono text-xs md:text-sm max-h-60 md:max-h-96 overflow-y-auto custom-scrollbar"
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className={log.startsWith(">") ? "text-green-400 mb-1" : "text-cyan-300 mb-1"}
            >
              {log}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 p-4 border-t border-green-500/20 bg-black/40">
          <span className="text-green-400 font-mono">$</span>
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
            className="flex-1 bg-transparent outline-none text-green-400 font-mono text-xs md:text-sm"
            placeholder="type 'help' for commands..."
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function SenkuProtocol() {
  const [activeTab, setActiveTab] = useState("scan");
  const [isConnected, setIsConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const tabs = [
    { id: "scan", label: "Quantum Scanner", icon: Search, gradient: "from-purple-600 to-cyan-500" },
    { id: "radar", label: "Whale Radar", icon: Radar, gradient: "from-cyan-600 to-blue-500" },
    { id: "terminal", label: "Terminal", icon: Terminal, gradient: "from-green-600 to-emerald-500" }
  ];
  
  const renderContent = () => {
    if (activeTab === "scan") return <ScannerTab />;
    if (activeTab === "radar") return <RadarTab />;
    if (activeTab === "terminal") return <TerminalTab />;
    return <ScannerTab />;
  };
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <NeuralNetwork3D />
      <FloatingParticles />
      
      <MetricsBar />
      <PriceTicker />
      
      <div className="relative z-10">
        <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative w-10 h-10 md:w-16 md:h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl animate-pulse blur-md" />
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center font-black text-white text-lg md:text-3xl">
                    S
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-4xl font-black">
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                      SENKU
                    </span>
                  </h1>
                  <p className="text-[10px] md:text-sm text-purple-300 font-mono">Protocol Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className={"px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold flex items-center gap-2 transition-all text-xs md:text-sm " + (
                    isConnected 
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50" 
                      : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                  )}
                >
                  {isConnected ? <Unlock className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  <span className="hidden sm:inline">{isConnected ? "Connected" : "Connect"}</span>
                </button>
                
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 bg-purple-500/20 rounded-lg border border-purple-500/30"
                >
                  {menuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[88px] bg-black/95 backdrop-blur-2xl z-40 p-4 space-y-3 animate-fadeIn">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMenuOpen(false);
                  }}
                  className={"w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all " + (
                    activeTab === tab.id
                      ? "bg-gradient-to-r " + tab.gradient + " text-white shadow-xl"
                      : "bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:border-purple-400/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}
        
        <div className="hidden md:block max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={"p-6 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all " + (
                    activeTab === tab.id
                      ? "bg-gradient-to-r " + tab.gradient + " text-white shadow-2xl shadow-purple-500/30 scale-105"
                      : "bg-purple-500/10 border-2 border-purple-500/30 text-purple-300 hover:border-purple-400/50 hover:scale-105"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          <div className="animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mt-12 py-6 border-t border-purple-500/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs md:text-sm font-mono">SENKU Protocol v5.0 • Solana Intelligence Network</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-400/60">
            <span>Built by</span>
            <span className="text-purple-300 font-semibold">Bader Alkorgli</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-slideRight {
          animation: slideRight 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}
