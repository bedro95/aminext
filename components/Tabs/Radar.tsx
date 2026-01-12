import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Point {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

const RadarTab = () => {
  const [points, setPoints] = useState<Point[]>([]);

  // محاكاة ظهور نقاط عشوائية على الرادار
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // تموضع عشوائي
        y: Math.random() * 80 + 10,
        opacity: 1,
      };
      setPoints((prev) => [...prev.slice(-5), newPoint]); // الاحتفاظ بآخر 6 نقاط فقط
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-black/60 border border-green-500/20 rounded-xl backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.1)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <h2 className="text-xl font-mono text-green-400 font-bold uppercase tracking-[0.2em]">
            Senku Live Radar
          </h2>
        </div>
        <div className="text-[10px] font-mono text-green-700">
          COORDINATES: 32.8872° N, 13.1913° E
        </div>
      </div>

      <div className="relative aspect-square max-w-[400px] mx-auto border border-green-500/30 rounded-full overflow-hidden bg-green-950/5">
        {/* الدوائر الداخلية */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border border-green-500/10 rounded-full" />
          <div className="w-1/2 h-1/2 border border-green-500/10 rounded-full" />
          <div className="w-1/4 h-1/4 border border-green-500/10 rounded-full" />
          
          {/* خطوط الطول والعرض */}
          <div className="absolute w-full h-[1px] bg-green-500/20" />
          <div className="absolute h-full w-[1px] bg-green-500/20" />
        </div>

        {/* ذراع المسح (Scanner Sweep) */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,197,94,0.4)_100%)] animate-[spin_3s_linear_infinite]" />

        {/* النقاط المكتشفة */}
        {points.map((point) => (
          <motion.div
            key={point.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 3 }}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            className="absolute w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] z-20"
          />
        ))}

        {/* تأثير الـ Static Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 border border-green-500/10 bg-green-500/5 rounded">
          <p className="text-[10px] text-green-700 uppercase">Detection Status</p>
          <p className="text-green-400 font-mono text-sm">ACTIVE SCANNING...</p>
        </div>
        <div className="p-3 border border-green-500/10 bg-green-500/5 rounded">
          <p className="text-[10px] text-green-700 uppercase">Objects Found</p>
          <p className="text-green-400 font-mono text-sm">{points.length} SIGNALS</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RadarTab;
