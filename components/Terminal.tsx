"use client";

import React, { useState, useEffect } from 'react';

const Terminal = () => {
  const [text, setText] = useState('');
  const message = "> Senku System Online... Analyzing Data... 100% Success.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) {
        // يعيد الكتابة من جديد بعد توقف بسيط
        setTimeout(() => { i = 0; }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-green-500/20 font-mono text-[10px] md:text-xs text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
      <div className="flex gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
      </div>
      <span className="leading-relaxed">{text}</span>
      <span className="animate-pulse ml-1 inline-block w-1.5 h-3 bg-green-500"></span>
    </div>
  );
};

export default Terminal;
