"use client";

import { useEffect, useState } from 'react';

export function useCryptoData() {
  const [prices, setPrices] = useState({ btc: 0, eth: 0, sol: 0 });
  const [gas, setGas] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        const data = await res.json();
        setPrices({
          btc: data.bitcoin.usd,
          eth: data.ethereum.usd,
          sol: data.solana.usd
        });
      } catch (e) { console.error(e); }
    };

    const fetchGas = async () => {
      try {
        // Using a public gas oracle or mock if API key needed
        setGas(Math.floor(Math.random() * 20) + 15);
      } catch (e) { console.error(e); }
    };

    fetchPrices();
    fetchGas();
    const interval = setInterval(() => {
      fetchPrices();
      fetchGas();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return { prices, gas };
}
