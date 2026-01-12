import React from 'react';
import { motion } from 'framer-motion';

const HallOfFameTab = () => {
  const champions = [
    { name: "Early Adopter", reward: "5000 SENKU" },
    { name: "Top Security Hunter", reward: "3000 SENKU" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-black/40 border border-yellow-500/30 rounded-lg backdrop-blur-md"
    >
      <h2 className="text-xl font-bold text-yellow-400 mb-6 uppercase tracking-widest text-center">
        🏆 Hall Of Fame
      </h2>
      
      <div className="space-y-4">
        {champions.map((champ, index) => (
          <div key={index} className="flex justify-between p-3 border-b border-yellow-900/50">
            <span className="text-gray-300 font-mono">{champ.name}</span>
            <span className="text-yellow-500 font-bold">{champ.reward}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HallOfFameTab;

