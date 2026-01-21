“use client”;

import { useState, useMemo, useEffect, useRef } from “react”;
import { motion, AnimatePresence } from “framer-motion”;
import {
Github, Shield, Radar, Search, Trophy,
Map, Activity, Flame, TrendingUp, TrendingDown, Minus, Info, Fingerprint,
Zap, Target, Cpu, Radio, Bell
} from “lucide-react”;

// Mock Components (replace with your actual imports)
const RoadmapSection = () => <div className="text-center p-20 text-white/40">Roadmap Module</div>;
const AboutSection = () => <div className="text-center p-20 text-white/40">About Module</div>;
const ScientificPassport = () => <div className="text-center p-20 text-white/40">Passport Module</div>;
const ScanTab = () => <div className="text-center p-20 text-white/40">Scan Module</div>;
const RugShieldTab = () => <div className="text-center p-20 text-white/40">Security Module</div>;
const RadarTab = () => <div className="text-center p-20 text-white/40">Radar Module</div>;
const HallOfFameTab = () => <div className="text-center p-20 text-white/40">Hall of Fame</div>;
const WhaleRadar = () => <div className="p-6 bg-black/40 rounded-2xl border border-[#00FFCC]/20"><h3 className="text-[#00FFCC] font-bold mb-4">🐋 Whale Radar</h3><div className="text-white/40 text-sm">Live whale tracking…</div></div>;
const QuantumScanner = () => <div className="p-6 bg-black/40 rounded-2xl border border-[#00FFCC]/20"><h3 className="text-[#00FFCC] font-bold mb-4">⚛️ Quantum Scanner</h3><div className="text-white/40 text-sm">Scanning blockchain…</div></div>;
const QuantumAudit = () => <div className="text-center p-20 text-white/40">Quantum Audit Module</div>;
const IntelligenceTerminal = () => <div className="p-6 bg-black/40 rounded-2xl border border-[#00FFCC]/20"><h3 className="text-[#00FFCC] font-bold mb-4">🧠 Intelligence</h3><div className="text-white/40 text-sm">AI Analysis active…</div></div>;

const TABS = [
{ id: “scan”, label: “Scanner”, icon: Search, color: “text-[#00FFCC]” },
{ id: “security”, label: “Audit”, icon: Shield, color: “text-[#00E0FF]” },
{ id: “radar”, label: “Radar”, icon: Radar, color: “text-[#00FFCC]” },
{ id: “roadmap”, label: “Roadmap”, icon: Map, color: “text-[#fbbf24]” },
{ id: “passport”, label: “ID Card”, icon: Fingerprint, color: “text-[#00FFCC]” },
{ id: “about”, label: “About”, icon: Info, color: “text-white” },
] as const;

// ⚡ NEW: Animated Particles Background
const ParticleField = () => {
const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

```
const ctx = canvas.getContext('2d');
if (!ctx) return;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles: any[] = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2
  });
}

const animate = () => {
  ctx.fillStyle = 'rgba(2, 2, 2, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 255, 204, 0.3)';
    ctx.fill();
    
    // Draw connections
    particles.slice(i + 1).forEach(p2 => {
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 255, 204, ${0.1 * (1 - dist / 150)})`;
        ctx.stroke();
      }
    });
  });
  
  requestAnimationFrame(animate);
};

animate();
```

}, []);

return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
};

// ⚡ NEW: Live Activity Feed
const LiveActivityFeed = () => {
const [activities, setActivities] = useState([
{ id: 1, type: ‘whale’, text: ‘Whale bought 50K SOL’, time: ‘2s ago’ },
{ id: 2, type: ‘alert’, text: ‘New token launched’, time: ‘15s ago’ },
{ id: 3, type: ‘scan’, text: ‘Contract audited: SAFE’, time: ‘1m ago’ },
]);

useEffect(() => {
const interval = setInterval(() => {
const newActivity = {
id: Date.now(),
type: [‘whale’, ‘alert’, ‘scan’][Math.floor(Math.random() * 3)],
text: [
‘Large transfer detected’,
‘Price spike alert’,
‘New liquidity pool’,
‘Contract scan completed’
][Math.floor(Math.random() * 4)],
time: ‘just now’
};

```
  setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
}, 8000);

return () => clearInterval(interval);
```

}, []);

return (
<div className="p-6 bg-black/40 rounded-2xl border border-[#00FFCC]/20">
<div className="flex items-center gap-2 mb-4">
<Radio className="w-5 h-5 text-[#00FFCC] animate-pulse" />
<h3 className="text-[#00FFCC] font-bold">Live Activity</h3>
</div>
<div className="space-y-3">
<AnimatePresence>
{activities.map((activity) => (
<motion.div
key={activity.id}
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 20 }}
className=“flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-white/5”
>
<div className="w-2 h-2 rounded-full bg-[#00FFCC] mt-1.5 animate-pulse" />
<div className="flex-1">
<p className="text-white/80 text-sm">{activity.text}</p>
<span className="text-white/40 text-xs">{activity.time}</span>
</div>
</motion.div>
))}
</AnimatePresence>
</div>
</div>
);
};

// ⚡ NEW: Crypto News Ticker
const NewsTicker = () => {
const news = [
“🚀 Bitcoin reaches new ATH”,
“⚡ Solana TPS hits record high”,
“🔥 Major DeFi protocol launches”,
“💎 New NFT collection trending”,
“🐋 Whale moves 100M USDC”,
];

return (
<div className="w-full bg-black/60 border-y border-[#00FFCC]/20 py-2 overflow-hidden">
<motion.div
animate={{ x: [0, -2000] }}
transition={{ duration: 30, repeat: Infinity, ease: “linear” }}
className=“flex gap-12 whitespace-nowrap text-[#00FFCC]/60 text-sm font-mono”
>
{[…news, …news, …news].map((item, i) => (
<span key={i} className="flex items-center gap-2">
<Zap className="w-3 h-3" />
{item}
</span>
))}
</motion.div>
</div>
);
};

export default function SenkuUltraPage() {
const [activeTab, setActiveTab] = useState<(typeof TABS)[number][“id”]>(“scan”);
const [hasEntered, setHasEntered] = useState(true);
const [scannedAddress, setScannedAddress] = useState(””);

// Mock price data
const prices = {
SOL: { price: 98.45, trend: “up” },
JUP: { price: 0.8234, trend: “up” },
RAY: { price: 1.82, trend: “down” },
SEND: { price: 0.034, trend: “up” },
};

const solMetrics = { tps: 3247, epoch: 587 };

const renderTabContent = useMemo(() => {
switch (activeTab) {
case “scan”: return <ScanTab />;
case “security”: return <QuantumAudit />;
case “radar”: return <RadarTab />;
case “roadmap”: return <RoadmapSection />;
case “passport”: return <div className="flex items-center justify-center h-full py-10"><ScientificPassport /></div>;
case “about”: return <AboutSection />;
default: return <ScanTab />;
}
}, [activeTab]);

const PriceTickerItem = ({ symbol, data }: { symbol: string; data: any }) => {
const Icon = data.trend === “up” ? TrendingUp : data.trend === “down” ? TrendingDown : Minus;
const colorClass = data.trend === “up” ? “text-green-400” : data.trend === “down” ? “text-red-400” : “text-[#00FFCC]”;

```
return (
  <div className="flex items-center gap-2 border-l border-white/10 pl-6">
    <span className="text-white/40">{symbol}:</span>
    <div className="flex items-center gap-1">
      <span className={`${colorClass} font-bold drop-shadow-[0_0_5px_rgba(0,255,204,0.3)]`}>
        ${data.price.toLocaleString(undefined, { minimumFractionDigits: symbol === "JUP" ? 4 : 2, maximumFractionDigits: symbol === "JUP" ? 4 : 2 })}
      </span>
      <Icon className={`w-3 h-3 ${colorClass}`} />
    </div>
  </div>
);
```

};

return (
<div 
className="min-h-screen bg-[#020202] text-white flex flex-col items-center selection:bg-[#00FFCC]/30 overflow-x-hidden font-sans relative"
>
{/* Background Effects */}
<div className="fixed inset-0 bg-black/90 z-0" />
<ParticleField />

```
  {/* ⚡ NEW: News Ticker */}
  <NewsTicker />

  {/* 🛸 ENHANCED MOBILE FLOATING DOCK */}
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] md:hidden">
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-black/90 backdrop-blur-xl px-4 py-2 rounded-full border border-[#00FFCC]/30 flex items-center gap-4 shadow-[0_0_50px_rgba(0,255,204,0.3)]"
    >
      {TABS.slice(0, 5).map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-full transition-all ${
              activeTab === tab.id 
                ? "bg-[#00FFCC]/20 text-[#00FFCC] shadow-[0_0_20px_rgba(0,255,204,0.3)]" 
                : "text-white/40"
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </motion.div>
  </div>

  {/* 📊 ENHANCED METRICS BAR */}
  <div className="w-full flex justify-between px-4 md:px-6 py-3 my-4 md:my-6 bg-black/60 backdrop-blur-xl rounded-full text-[9px] md:text-[10px] font-mono tracking-tighter uppercase text-white gap-4 md:gap-6 border border-[#00FFCC]/20 shadow-[0_0_30px_rgba(0,255,204,0.1)] overflow-x-auto whitespace-nowrap scrollbar-hide z-10">
    <motion.div 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex items-center gap-2"
    >
      <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse" />
      SOL_TPS: <span className="text-[#00FFCC] font-bold">{solMetrics?.tps || '---'}</span>
    </motion.div>
    <div className="flex items-center gap-2 border-l border-white/10 pl-4 md:pl-6">
      EPOCH: <span className="text-[#00E0FF] font-bold">{solMetrics?.epoch || '---'}</span>
    </div>
    <PriceTickerItem symbol="SOL" data={prices.SOL} />
    <PriceTickerItem symbol="JUP" data={prices.JUP} />
    <PriceTickerItem symbol="RAY" data={prices.RAY} />
    <PriceTickerItem symbol="SEND" data={prices.SEND} />
  </div>

  <div className="w-full bg-black/60 border border-white/10 rounded-[30px] md:rounded-[45px] backdrop-blur-3xl overflow-hidden shadow-[0_0_150px_rgba(0,255,204,0.05)] flex flex-col z-10">
    
    {/* ENHANCED HEADER */}
    <div className="w-full px-5 md:px-10 py-6 md:py-10 flex justify-between items-center border-b border-white/5 bg-gradient-to-r from-[#00FFCC]/[0.05] to-transparent relative overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent"
        animate={{ x: [-1000, 1000] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="flex items-center gap-6">
        <motion.img 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          src="/Senku-icon.png" 
          className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(0,255,204,0.5)]" 
          alt="Senku" 
        />
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-[0_0_15px_rgba(0,255,204,0.5)]">
            Senku Protocol
          </h1>
          <div className="flex items-center gap-3 mt-2 md:mt-4">
            <div className="w-2 h-2 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC] animate-pulse" />
            <span className="text-[10px] md:text-[12px] font-mono tracking-[0.4em] md:tracking-[0.6em] text-[#00FFCC] uppercase font-bold">Scientific Labs Terminal</span>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <motion.a 
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          href="https://github.com/bedro95"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-5 bg-black border border-[#00FFCC]/30 rounded-full shadow-[0_0_30px_rgba(0,255,204,0.3)] group"
        >
          <Github className="w-8 h-8 text-[#00FFCC]" />
          <div className="absolute inset-0 rounded-full bg-[#00FFCC] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
        </motion.a>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row min-h-[80vh]">
      
      {/* 🛡️ ENHANCED NAVIGATION */}
      <nav className="hidden md:flex md:w-32 border-r border-white/10 flex-col items-center justify-center gap-10 p-8 bg-black/40 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#00FFCC]/20 to-transparent" />
        
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-5 rounded-[2rem] transition-all duration-500 ${
                  isActive 
                    ? "bg-[#00FFCC]/10 border border-[#00FFCC]/30 shadow-[0_0_30px_rgba(0,255,204,0.3)]" 
                    : "opacity-20 group-hover:opacity-100 group-hover:bg-white/5"
                }`}
              >
                <Icon className={`w-8 h-8 ${isActive ? "text-[#00FFCC]" : "text-white"}`} />
              </motion.div>
              {isActive && (
                <motion.div 
                  layoutId="navIndicator" 
                  className="absolute -right-[40px] top-1/2 -translate-y-1/2 w-2 h-20 bg-[#00FFCC] rounded-full shadow-[0_0_40px_#00FFCC]"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* 📊 ENHANCED MAIN CONTENT */}
        <main className="flex-1 relative p-6 md:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              {renderTabContent}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 🚀 ENHANCED SIDEBARS */}
        <aside className="w-full lg:w-[450px] p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col gap-10 bg-black/[0.02]">
          <LiveActivityFeed />
          <WhaleRadar />
          <QuantumScanner />
          <IntelligenceTerminal />
        </aside>
      </div>
    </div>

    {/* FOOTER */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-12 bg-black/80 border-t border-white/10">
      <div className="flex flex-col gap-4">
        <h4 className="text-[#00FFCC] font-black italic uppercase text-xs tracking-[0.2em]">Community</h4>
        <a href="https://x.com/i/communities/2006055334024982921" className="text-white/40 hover:text-white transition-colors text-xs font-mono">X Community</a>
        <a href="#" className="text-white/40 hover:text-white transition-colors text-xs font-mono">Discord Lab</a>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[#00FFCC] font-black italic uppercase text-xs tracking-[0.2em]">Founder</h4>
        <a href="https://x.com/itsabader?s=21" className="text-white/40 hover:text-white transition-colors text-xs font-mono">Bader Alkorgli</a>
        <a href="#" className="text-white/40 hover:text-white transition-colors text-xs font-mono">Contact Lab</a>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[#00FFCC] font-black italic uppercase text-xs tracking-[0.2em]">Products</h4>
        <div className="grid grid-cols-2 gap-2 text-white/40 text-xs font-mono">
          <span>Quantum Scanner</span>
          <span>Whale Radar</span>
          <span>Quantum Audit</span>
          <span>Scientific Passport</span>
        </div>
      </div>
    </div>

    <footer className="w-full px-10 py-6 flex flex-col md:flex-row justify-between items-center bg-black border-t border-white/5 text-[10px] font-mono tracking-widest text-white/30 uppercase italic gap-4">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <span className="flex items-center gap-3 text-[#00FFCC] font-bold">
          <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-ping" /> 
          Sync_Status: Optimal
        </span>
        <span className="text-white/50 md:border-l border-white/10 md:pl-10">Network: Solana_Mainnet</span>
        <span className="text-white/50 md:border-l border-white/10 md:pl-10">© 2026 Senku Protocol</span>
      </div>
      <div className="flex items-center gap-3 text-[#00FFCC]/60">
        <Activity className="w-4 h-4 animate-pulse" />
        Senku_OS v5.1.0
      </div>
    </footer>
  </div>
</div>
```

);
}
