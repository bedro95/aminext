import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_ENDPOINT);

export async function getSolanaMetrics() {
  try {
    const [tps, epoch, slot] = await Promise.all([
      connection.getRecentPerformanceSamples(1),
      connection.getEpochInfo(),
      connection.getSlot(),
    ]);
    
    const currentTps = tps[0] ? Math.round(tps[0].numTransactions / tps[0].samplePeriodSecs) : 0;

    return {
      tps: currentTps,
      epoch: epoch.epoch,
      slot: slot,
    };
  } catch (error) {
    console.error('Solana metrics error:', error);
    return null;
  }
}

export async function getWalletInfo(address: string) {
  try {
    const pubKey = new PublicKey(address);
    const balance = await connection.getBalance(pubKey);
    const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 5 });
    
    return {
      balance: balance / LAMPORTS_PER_SOL,
      transactions: signatures,
    };
  } catch (error) {
    console.error('Wallet fetch error:', error);
    return null;
  }
}
