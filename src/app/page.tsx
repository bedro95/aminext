import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
Github, Shield, Radar, Search, Trophy, Map, Activity,
TrendingUp, TrendingDown, Minus, Info, Fingerprint,
Zap, Radio, Bell, Target, Cpu, Eye, Lock, Unlock,
Wifi, WifiOff, Database, Server, Terminal, Code
} from ‘lucide-react’;

// ============================================
// ADVANCED VISUAL EFFECTS
// ============================================

const MatrixRain = () => {
const canvasRef = useRef(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

```
const ctx = canvas.getContext('2d');
if (!ctx) return;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'SENKU01アイウエオカキクケコサシスセソ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00FFCC';
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
```

}, []);

return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
};

const HolographicGrid = () => {
return (
<div className="fixed inset-0 pointer-events-none z-[1]">
<div className=“absolute inset-0” style={{
backgroundImage: `linear-gradient(to right, rgba(0,255,204,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,204,0.03) 1px, transparent 1px)`,
backgroundSize: ‘50px 50px’
}} />
<div className=“absolute inset-0” style={{
background: ‘radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)’
}} />
</div>
);
};

const PulsingOrb = ({ className = “” }) => {
return (
<div className={`relative ${className}`}>
<div className="absolute inset-0 bg-[#00FFCC] rounded-full animate-ping opacity-20" />
<div className="absolute inset-0 bg-gradient-to-r from-[#00FFCC] to-[#00E0FF] rounded-full blur-xl opacity-50 animate-pulse" />
<div className="relative w-full h-full bg-[#00FFCC] rounded-full shadow-[0_0_30px_rgba(0,255,204,0.8)]" />
</div>
);
};

// ============================================
// LIVE DATA COMPONENTS
// ============================================

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

```
updateMetrics();
const interval = setInterval(updateMetrics, 3000);
return () => clearInterval(interval);
```

}, []);

return (
<div className="w-full bg-black/80 backdrop-blur-xl border-y border-[#00FFCC]/30 py-3 px-6 overflow-hidden">
<div className="flex items-center justify-between gap-8 text-xs font-mono">
<div className="flex items-center gap-2">
<div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse" />
<span className="text-white/60">TPS:</span>
<span className="text-[#00FFCC] font-bold tabular-nums">
{metrics.tps.toLocaleString()}
</span>
</div>

```
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
    
    <div className="flex items-center gap-2">
      <Zap className="w-3 h-3 text-green-400" />
      <span className="text-white/60">Block:</span>
      <span className="text-green-400 font-bold">{metrics.avgBlockTime}ms</span>
    </div>
  </div>
</div>
```

);
};

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
SOL: { …prev.SOL, price: prev.SOL.price + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 5 },
JUP: { …prev.JUP, price: prev.JUP.price + (Math.random() - 0.5) * 0.01, change: (Math.random() - 0.5) * 3 },
RAY: { …prev.RAY, price: prev.RAY.price + (Math.random() - 0.5) * 0.1, change: (Math.random() - 0.5) * 4 },
BONK: { …prev.BONK, price: prev.BONK.price + (Math.random() - 0.5) * 0.000001, change: (Math.random() - 0.5) * 8 }
}));
}, 2000);
return () => clearInterval(interval);
}, []);

return (
<div className="w-full bg-black/60 border-y border-[#00FFCC]/20 py-3 overflow-hidden">
<div className="flex animate-marquee whitespace-nowrap">
{Object.entries(prices).map(([symbol, data]) => {
const Icon = data.change > 0 ? TrendingUp : TrendingDown;
const color = data.change > 0 ? ‘text-green-400’ : ‘text-red-400’;

```
      return (
        <div key={symbol} className="inline-flex items-center gap-3 mx-8 text-sm font-mono">
          <span className="text-white/60">{symbol}</span>
          <span className="text-[#00FFCC] font-bold tabular-nums">
            ${symbol === 'BONK' ? data.price.toFixed(8) : data.price.toFixed(4)}
          </span>
          <span className={`${color} flex items-center gap-1`}>
            <Icon className="w-3 h-3" />
            {Math.abs(data.change).toFixed(2)}%
          </span>
        </div>
      );
    })}
  </div>
</div>
```

);
};

// ============================================
// INTERACTIVE TERMINAL
// ============================================

const TerminalWindow = () => {
const [logs, setLogs] = useState([
‘> Initializing Senku Protocol…’,
‘> Connecting to Solana mainnet…’,
‘> Loading quantum scanner modules…’,
‘> System ready. Awaiting commands.’
]);
const [input, setInput] = useState(’’);

const handleCommand = (cmd) => {
const responses = {
‘scan’: ‘> Initiating deep scan of contract…’,
‘audit’: ‘> Running security audit protocols…’,
‘status’: ‘> All systems operational. Network synced.’,
‘help’: ‘> Available: scan, audit, status, whale, clear’,
‘whale’: ‘> Whale radar activated. Monitoring large transfers…’,
‘clear’: ‘CLEAR’
};

```
const response = responses[cmd.toLowerCase()] || `> Unknown command: ${cmd}`;

if (response === 'CLEAR') {
  setLogs([]);
} else {
  setLogs(prev => [...prev.slice(-5), `$ ${cmd}`, response]);
}
```

};

return (
<div className="bg-black/90 rounded-2xl border border-[#00FFCC]/30 p-6 font-mono text-xs">
<div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
<Terminal className="w-4 h-4 text-[#00FFCC]" />
<span className="text-[#00FFCC]">SENKU_TERMINAL</span>
</div>

```
  <div className="space-y-1 mb-4 max-h-40 overflow-y-auto">
    {logs.map((log, i) => (
      <div key={i} className={log.startsWith('>') ? 'text-[#00FFCC]' : 'text-white/60'}>
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
        if (e.key === 'Enter') {
          handleCommand(input);
          setInput('');
        }
      }}
      className="flex-1 bg-transparent outline-none text-white"
      placeholder="type 'help' for commands..."
    />
  </div>
</div>
```

);
};

// ============================================
// ENHANCED ACTIVITY FEED
// ============================================

const ActivityFeed = () => {
const [activities, setActivities] = useState([
{ id: 1, type: ‘whale’, text: ‘Whale moved 250K SOL’, value: ‘+$46.3M’, time: ‘3s’ },
{ id: 2, type: ‘scan’, text: ‘Contract audit completed’, value: ‘SAFE’, time: ‘15s’ },
{ id: 3, type: ‘alert’, text: ‘New liquidity pool detected’, value: ‘$2.1M’, time: ‘1m’ },
]);

useEffect(() => {
const interval = setInterval(() => {
const types = [‘whale’, ‘scan’, ‘alert’, ‘launch’];
const texts = [
‘Large transfer detected’,
‘Security scan completed’,
‘New token launched’,
‘Liquidity added’,
‘Whale wallet active’
];

```
  const newActivity = {
    id: Date.now(),
    type: types[Math.floor(Math.random() * types.length)],
    text: texts[Math.floor(Math.random() * texts.length)],
    value: Math.random() > 0.5 ? `$${(Math.random() * 10).toFixed(1)}M` : 'SAFE',
    time: 'now'
  };
  
  setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
}, 5000);

return () => clearInterval(interval);
```

}, []);

const getIcon = (type) => {
switch(type) {
case ‘whale’: return <Target className="w-4 h-4 text-blue-400" />;
case ‘scan’: return <Shield className="w-4 h-4 text-green-400" />;
case ‘alert’: return <Bell className="w-4 h-4 text-yellow-400" />;
default: return <Zap className="w-4 h-4 text-[#00FFCC]" />;
}
};

return (
<div className="bg-black/60 rounded-2xl border border-[#00FFCC]/20 p-6">
<div className="flex items-center gap-2 mb-4">
<Radio className="w-5 h-5 text-[#00FFCC] animate-pulse" />
<h3 className="text-[#00FFCC] font-bold">Live Feed</h3>
</div>

```
  <div className="space-y-2">
    {activities.map((activity, i) => (
      <div
        key={activity.id}
        className="flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-white/5 hover:border-[#00FFCC]/30 transition-all cursor-pointer group"
        style={{
          animation: `slideIn 0.3s ease-out ${i * 0.1}s both`
        }}
      >
        {getIcon(activity.type)}
        <div className="flex-1 min-w-0">
          <p className="text-white/80 text-sm truncate">{activity.text}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#00FFCC] text-xs font-mono">{activity.value}</span>
            <span className="text-white/40 text-xs">• {activity.time}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

);
};

// ============================================
// NETWORK VISUALIZER
// ============================================

const NetworkVisualizer = () => {
const canvasRef = useRef(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

```
const ctx = canvas.getContext('2d');
if (!ctx) return;

const width = canvas.width = 400;
const height = canvas.height = 200;

const nodes = Array.from({ length: 20 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  radius: 2 + Math.random() * 2
}));

const animate = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);
  
  nodes.forEach((node, i) => {
    node.x += node.vx;
    node.y += node.vy;
    
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00FFCC';
    ctx.fill();
    
    nodes.slice(i + 1).forEach(other => {
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(0, 255, 204, ${0.2 * (1 - dist / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });
  
  requestAnimationFrame(animate);
};

animate();
```

}, []);

return (
<div className="bg-black/60 rounded-2xl border border-[#00FFCC]/20 p-6">
<div className="flex items-center gap-2 mb-4">
<Wifi className="w-5 h-5 text-[#00FFCC]" />
<h3 className="text-[#00FFCC] font-bold">Network Graph</h3>
</div>
<canvas ref={canvasRef} className="w-full h-auto rounded-lg" />
</div>
);
};

// ============================================
// MAIN APP
// ============================================

export default function SenkuUltra() {
const [activeTab, setActiveTab] = useState(‘scan’);
const [isConnected, setIsConnected] = useState(false);

const tabs = [
{ id: ‘scan’, label: ‘Scanner’, icon: Search },
{ id: ‘audit’, label: ‘Audit’, icon: Shield },
{ id: ‘radar’, label: ‘Radar’, icon: Radar },
{ id: ‘terminal’, label: ‘Terminal’, icon: Terminal },
];

return (
<div className="min-h-screen bg-black text-white relative overflow-hidden">
{/* Background Effects */}
<MatrixRain />
<HolographicGrid />

```
  {/* Top Metrics Bar */}
  <LiveMetricsBar />
  
  {/* Price Ticker */}
  <PriceTicker />
  
  {/* Main Container */}
  <div className="relative z-10 max-w-[1800px] mx-auto p-6">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-8 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-[#00FFCC]/30">
      <div className="flex items-center gap-6">
        <div className="relative w-16 h-16">
          <PulsingOrb className="w-full h-full" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight">
            SENKU <span className="text-[#00FFCC]">PROTOCOL</span>
          </h1>
          <p className="text-sm text-white/60 font-mono mt-1">
            Advanced Blockchain Intelligence System
          </p>
        </div>
      </div>
      
      <button
        onClick={() => setIsConnected(!isConnected)}
        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
          isConnected 
            ? 'bg-green-500/20 border-2 border-green-500 text-green-400' 
            : 'bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC] hover:bg-[#00FFCC]/30'
        }`}
      >
        {isConnected ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        {isConnected ? 'Connected' : 'Connect Wallet'}
      </button>
    </div>
    
    {/* Navigation Tabs */}
    <div className="flex gap-4 mb-8">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
              activeTab === tab.id
                ? 'bg-[#00FFCC]/20 border-2 border-[#00FFCC] text-[#00FFCC] shadow-[0_0_30px_rgba(0,255,204,0.3)]'
                : 'bg-black/40 border-2 border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            <Icon className="w-5 h-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
    
    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {activeTab === 'terminal' ? (
          <TerminalWindow />
        ) : (
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-[#00FFCC]/30 p-8 min-h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <PulsingOrb className="w-full h-full" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {tabs.find(t => t.id === activeTab)?.label} Module
              </h2>
              <p className="text-white/60">
                Advanced {activeTab} functionality coming soon
              </p>
            </div>
          </div>
        )}
        
        <NetworkVisualizer />
      </div>
      
      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        <ActivityFeed />
        
        {/* Quick Stats */}
        <div className="bg-black/60 rounded-2xl border border-[#00FFCC]/20 p-6">
          <h3 className="text-[#00FFCC] font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Quick Stats
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Total Scans', value: '12,847', change: '+23%' },
              { label: 'Safe Contracts', value: '9,234', change: '+15%' },
              { label: 'Active Users', value: '3,456', change: '+42%' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <span className="text-white/60 text-sm">{stat.label}</span>
                <div className="text-right">
                  <div className="text-[#00FFCC] font-bold">{stat.value}</div>
                  <div className="text-green-400 text-xs">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Footer */}
  <div className="relative z-10 mt-12 py-6 border-t border-white/10 text-center text-white/40 text-sm font-mono">
    <div className="flex items-center justify-center gap-2">
      <Activity className="w-4 h-4 animate-pulse text-[#00FFCC]" />
      SENKU Protocol v5.0 • Engineered by Bader Alkorgli
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
    
    .animate-marquee:hover {
      animation-play-state: paused;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>
</div>
```

);
}