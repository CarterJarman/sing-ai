// src/components/tabs/NewCoins.jsx

import React, { useEffect, useState } from "react";
import { FaStar, FaFire, FaExchangeAlt, FaClock } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

// Helper for nice numbers
function formatNum(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num?.toString() ?? "";
}

export default function NewCoins() {
  const [dexCoins, setDexCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starred, setStarred] = useState({});
  const [search, setSearch] = useState("");

  // Fetch latest DEX coins from DexScreener
  useEffect(() => {
    setLoading(true);
    fetch("https://api.dexscreener.com/latest/dex/tokens")
      .then((res) => res.json())
      .then((data) => {
        setDexCoins(data.pairs || []);
      })
      .catch(() => setDexCoins([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter by search
  const coins = dexCoins.filter(
    (c) =>
      c.baseToken.symbol?.toLowerCase().includes(search.toLowerCase()) ||
      c.baseToken.name?.toLowerCase().includes(search.toLowerCase())
  );

  function toggleStar(addr) {
    setStarred((prev) => ({ ...prev, [addr]: !prev[addr] }));
  }

  return (
    <div className="max-w-4xl mx-auto px-2 pt-4 pb-12">
      <div className="flex gap-3 mb-6 items-center">
        <button
          className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow bg-[#2563eb] text-white"
          disabled
        >
          <MdCompareArrows /> DEX Listings (Live)
        </button>
        <button
          className="px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow bg-[#18181b] text-gray-400"
          title="CEX integration coming soon"
          disabled
        >
          <FaExchangeAlt /> CEX Listings
        </button>
        <input
          className="ml-3 px-3 py-2 rounded-lg border border-[#222] bg-[#18181b] text-white"
          placeholder="Search new coin…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-blue-400 text-lg py-8 animate-pulse">Loading new DEX tokens…</div>
      ) : coins.length === 0 ? (
        <div className="text-gray-400 py-10 text-center">No new coins found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#18181b] rounded-xl">
            <thead>
              <tr className="text-gray-300 text-left text-xs">
                <th className="px-4 py-2">Watch</th>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">FDV</th>
                <th className="px-4 py-2">Chain</th>
                <th className="px-4 py-2">Launched</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {coins.slice(0, 40).map((coin) => (
                <tr
                  key={coin.pairAddress}
                  className="hover:bg-[#232] border-b border-[#222] transition"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStar(coin.pairAddress)}
                      title={starred[coin.pairAddress] ? "Unwatch" : "Watch"}
                    >
                      <FaStar
                        className={`text-lg ${
                          starred[coin.pairAddress]
                            ? "text-yellow-400"
                            : "text-gray-400 hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 font-bold">{coin.baseToken.symbol}</td>
                  <td className="px-4 py-3">{coin.baseToken.name}</td>
                  <td className="px-4 py-3">
                    ${Number(coin.priceUsd).toPrecision(4)}
                  </td>
                  <td className="px-4 py-3">
                    ${formatNum(coin.fdv)}
                  </td>
                  <td className="px-4 py-3">{coin.chainId}</td>
                  <td className="px-4 py-3">
                    {coin.age ? `${Math.floor(coin.age/60)}m ago` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://dexscreener.com/${coin.chainId}/${coin.pairAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-xs"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-10 text-center text-gray-500 text-xs">
        CEX listings coming soon. DEX data via DexScreener API.
      </div>
    </div>
  );
}