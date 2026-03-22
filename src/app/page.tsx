'use client';

import { useState } from 'react';

interface StakingPool {
  name: string;
  token: string;
  apr: string;
  tvl: string;
  totalStaked: string;
  rewardsRate: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface LST {
  symbol: string;
  name: string;
  underlying: string;
  price: number;
  balance: number;
  staked: number;
  unstaked: number;
  apr: number;
}

const stakingPools: StakingPool[] = [
  { name: 'Lido', token: 'rETH', apr: '4.2%', tvl: '$15.2B', totalStaked: '$12.4B', rewardsRate: '0.11%', riskLevel: 'low' },
  { name: 'Rocket Pool', token: 'rETH', apr: '4.5%', tvl: '$4.8B', totalStaked: '$3.9B', rewardsRate: '0.12%', riskLevel: 'low' },
  { name: 'Fraxshare', token: 'FXS', apr: '3.8%', tvl: '$2.1B', totalStaked: '$1.7B', rewardsRate: '0.09%', riskLevel: 'medium' },
  { name: 'Pendle', token: 'PENDLE', apr: '8.2%', tvl: '$890M', totalStaked: '$720M', rewardsRate: '0.25%', riskLevel: 'medium' },
];

const lsts: LST[] = [
  { symbol: 'rETH', name: 'Liquid Staked ETH', underlying: 'ETH', price: 3450, balance: 15.2, staked: 12.4, unstaked: 2.8, apr: 4.2 },
  { symbol: 'wstETH', name: 'Wrapped Staked ETH', underlying: 'ETH', price: 3452, balance: 8.7, staked: 7.2, unstaked: 1.5, apr: 4.3 },
  { symbol: 'stETH', name: 'Lido Staked ETH', underlying: 'ETH', price: 3451, balance: 12.1, staked: 10.8, unstaked: 1.3, apr: 4.1 },
  { symbol: 'RETH', name: 'Rocket Pool ETH', underlying: 'ETH', price: 3453, balance: 5.4, staked: 4.5, unstaked: 0.9, apr: 4.5 },
  { symbol: 'rvETH', name: 'Vitalik ETH', underlying: 'ETH', price: 3500, balance: 2.1, staked: 1.8, unstaked: 0.3, apr: 5.2 },
];

export default function Home() {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [selectedLST, setSelectedLST] = useState<LST | null>(null);
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const stake = async () => {
    if (!amount) return;
    setIsStaking(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsStaking(false);
  };

  const unstake = async () => {
    if (!amount) return;
    setIsStaking(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsStaking(false);
  };

  const getRiskColor = (level: string) => {
    return level === 'low' ? 'bg-green-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-red-500';
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-yellow-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">LST Staking Simulator</h1>
          <p className="text-gray-400 mt-2">Liquid staking tokens with real-time APR and DeFi integration</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-yellow-400 p-4 text-center">
            <div className="text-3xl font-black text-yellow-400">$26.9B</div>
            <div className="text-sm text-gray-400">Total TVL</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">22.8M</div>
            <div className="text-sm text-gray-400">ETH Staked</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">4.3%</div>
            <div className="text-sm text-gray-400">Avg APR</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">5</div>
            <div className="text-sm text-gray-400">Top LSTs</div>
          </div>
        </section>

        {/* Staking Pools */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Liquid Staking Pools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {stakingPools.map((pool) => (
              <div
                key={pool.name}
                onClick={() => setSelectedPool(pool)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedPool?.name === pool.name
                    ? 'bg-yellow-900/30 border-yellow-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-yellow-400 text-lg">{pool.name}</h3>
                    <span className="text-sm text-gray-400">{pool.token}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getRiskColor(pool.riskLevel)}`} />
                    <span className={`text-xs font-bold ${
                      pool.riskLevel === 'low' ? 'text-green-400' :
                      pool.riskLevel === 'medium' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {pool.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">APR</div>
                    <div className="font-bold">{pool.apr}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">TVL</div>
                    <div className="font-bold">{pool.tvl}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Staked</div>
                    <div className="font-bold">{pool.totalStaked}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User's LST Portfolio */}
        <section className="bg-gray-900 border-4 border-yellow-400 p-6">
          <h2 className="text-xl font-black text-yellow-400 mb-4">Your LST Portfolio</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Token</th>
                  <th className="text-left py-3">Name</th>
                  <th className="text-right py-3">Price</th>
                  <th className="text-right py-3">Balance</th>
                  <th className="text-right py-3">Staked</th>
                  <th className="text-right py-3">Unstaked</th>
                  <th className="text-right py-3">APR</th>
                  <th className="text-right py-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {lsts.map((lst) => {
                  const value = lst.price * lst.balance;
                  return (
                    <tr
                      key={lst.symbol}
                      onClick={() => setSelectedLST(lst)}
                      className={`border-b border-gray-800 cursor-pointer hover:bg-gray-800 ${
                        selectedLST?.symbol === lst.symbol ? 'bg-yellow-900/20' : ''
                      }`}
                    >
                      <td className="py-3 font-bold text-yellow-400">{lst.symbol}</td>
                      <td className="py-3">{lst.name}</td>
                      <td className="py-3 text-right">${lst.price.toLocaleString()}</td>
                      <td className="py-3 text-right">{lst.balance.toFixed(2)}</td>
                      <td className="py-3 text-right text-green-400">{lst.staked.toFixed(2)}</td>
                      <td className="py-3 text-right text-gray-400">{lst.unstaked.toFixed(2)}</td>
                      <td className="py-3 text-right">{lst.apr}%</td>
                      <td className="py-3 text-right font-bold">${value.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Panel */}
        {selectedLST && (
          <section className="bg-gray-900 border-4 border-yellow-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-yellow-400">{selectedLST.symbol} Staking</h2>
                <p className="text-sm text-gray-400">{selectedLST.name}</p>
              </div>
              <button
                onClick={() => setSelectedLST(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Amount ({selectedLST.symbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 bg-gray-800 border-2 border-gray-600 text-white font-bold text-lg"
                    placeholder="0.00"
                  />
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700 mb-4">
                  <div className="text-sm text-gray-400">Estimated APR</div>
                  <div className="text-2xl font-bold text-yellow-400">{selectedLST.apr}%</div>
                </div>
                <button
                  onClick={stake}
                  disabled={!amount || isStaking}
                  className="w-full py-3 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStaking ? 'Staking...' : 'Stake Tokens'}
                </button>
              </div>
              <div>
                <div className="p-3 bg-gray-800 border border-gray-700 mb-4">
                  <div className="text-sm text-gray-400">Staked</div>
                  <div className="text-2xl font-bold text-green-400">{selectedLST.staked.toFixed(2)} {selectedLST.symbol}</div>
                </div>
                <div className="p-3 bg-gray-800 border border-gray-700 mb-4">
                  <div className="text-sm text-gray-400">Unstaked</div>
                  <div className="text-2xl font-bold text-gray-400">{selectedLST.unstaked.toFixed(2)} {selectedLST.symbol}</div>
                </div>
                <button
                  onClick={unstake}
                  disabled={!amount || isStaking}
                  className="w-full py-3 bg-red-500 text-white font-bold border-4 border-red-400 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStaking ? 'Unstaking...' : 'Unstake Tokens'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How LST Staking Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Stake ETH</h3>
              <p className="text-xs text-gray-400">Lock ETH into liquid staking pool</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Receive LST</h3>
              <p className="text-xs text-gray-400">Get rETH, stETH, wstETH, etc.</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Use LST in DeFi</h3>
              <p className="text-xs text-gray-400">Borrow, trade, earn yield</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Earn Rewards</h3>
              <p className="text-xs text-gray-400">APR rewards compound automatically</p>
            </div>
          </div>
        </section>

        {/* LSTs Guide */}
        <section className="bg-gray-900 border-4 border-purple-400 p-6">
          <h2 className="text-xl font-black text-purple-400 mb-4">Top LSTs Explained</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-yellow-400 mb-2">rETH (Lido)</h3>
              <p className="text-sm text-gray-400">Largest liquid staking token, $15B+ TVL. Most liquid and widely adopted.</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-yellow-400 mb-2">RETH (Rocket Pool)</h3>
              <p className="text-sm text-gray-400">Smallest stake means higher APR (4.5%). Fully decentralized, MEV-resistant.</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-yellow-400 mb-2">wstETH (EigenLayer)</h3>
              <p className="text-sm text-gray-400">Wrapped stETH, used for restaking and MEV extraction protection.</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-700">
              <h3 className="font-bold text-yellow-400 mb-2">rvETH (Vitalik)</h3>
              <p className="text-sm text-gray-400">Delegation pool from Vitalik Buterin. Highest APR (5.2%) - niche use case.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-yellow-400 hover:underline">@samdevrel</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
