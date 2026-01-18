"use client";

import { useState, useEffect } from "react";

const JUP_PRICE_API = "https://price.jup.ag/v6/price?ids=SOL,JUP,RAY,SEND";

export interface PriceData {
  price: number;
  trend: "up" | "down" | "stable";
}

export function usePriceEngine() {
  const [prices, setPrices] = useState<Record<string, PriceData>>({
    SOL: { price: 0, trend: "stable" },
    JUP: { price: 0, trend: "stable" },
    RAY: { price: 0, trend: "stable" },
    SEND: { price: 0, trend: "stable" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(JUP_PRICE_API);
        const json = await response.json();
        
        setPrices((prev) => {
          const newPrices: Record<string, PriceData> = {};
          ["SOL", "JUP", "RAY", "SEND"].forEach((id) => {
            const currentPrice = json.data[id]?.price || 0;
            const prevPrice = prev[id]?.price || 0;
            let trend: "up" | "down" | "stable" = "stable";
            
            if (prevPrice !== 0) {
              if (currentPrice > prevPrice) trend = "up";
              else if (currentPrice < prevPrice) trend = "down";
            }
            
            newPrices[id] = { price: currentPrice, trend };
          });
          return newPrices;
        });
        setLoading(false);
      } catch (e) {
        console.error("Price fetch error", e);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // 10s auto-refresh
    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}
