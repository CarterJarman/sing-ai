// src/components/tabs/NewCoins.jsx

import React, { useState } from "react";
import { FaStar, FaFire, FaExchangeAlt, FaClock } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

// Demo data: new coins on DEX/CEX
const DEMO_DEX_COINS = [
  {
    id: "memenew",
    name: "MemeNew",
    symbol: "MNEW",
    price: 0.00041,
    marketCap: 1840000,
    listed: "3 min ago",
    trending: true,
  },
  {
    id: "solbeam",
    name: "SolBeam",
    symbol: "SBEAM",
    price: 0.012,
    marketCap: 3300000,
    listed: "8 min ago",
    trending: false,
  },
  {
    id: "dogesurf",
    name: "Dogesurf",
    symbol: "SURF",
    price: 0.0039,
    marketCap: 900000,
    listed: "12 min ago",
    trending: false,
  },
];

const DEMO_CEX_COINS = [
  {
    id: "nextai",
    name: "NextAI",
    symbol: "NAI",
    price: 0.09,
    marketCap: 4200000,
    listed: "23 min ago",
    trending: true,
  },
  {
    id: "terraone",
    name: "TerraOne",
    symbol: "TERRA",
    price: 0.26,
    marketCap: 12000000,
    listed: "1 hour ago",
    trending: false,
  },
  {
    id: "bondtoken",
    name: "BondToken",
    symbol: "BND",
    price: 1.06,
    marketCap: 2500000,
    listed: "2 hours ago",
    trending: false,
  },
];

// Demo upcoming launches
const DEMO_UPCOMING = [
  {
    name: "ApexCat",
    symbol: "ACAT",
    type: "DEX",
    launch: "in 2h 30m",
  },
  {
    name: "EthVerse",
    symbol: "EVE",
    type: "CEX",
    launch: "in 5h 10m",
  },
];

function formatNum(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

export default function NewCoins() {
  const [isDex, setIsDex] = useState(true);
  const [starred, setStarred] = useState({});

  const coins = isDex ? DEMO_DEX_COINS : DEMO_CEX_COINS;

  function toggleStar(id) {
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="max-w-4xl mx-auto px-2 pt-4 pb-12">
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setIsDex(true)}
          className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow ${
            isDex
              ? "bg-[#2563eb] text-white"
              : "bg-[#18181b] text-gray-300 hover:bg-[#222]"
          }`}
        >
          <MdCompareArrows /> DEX Listings
        </button>
        <button
          onClick={() => setIsDex(false)}
          className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow ${
            !isDex
              ? "bg-[#2563eb] text-white"
              : "bg-[#18181b] text-gray-300 hover:bg-[#222]"
          }`}
        >
          <FaExchangeAlt /> CEX Listings
        </button>
      </div>

      {/* Trending Highlight */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaFire className="text-orange-400" />
          <span className="text-lg font-bold text-orange-300">Trending</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {coins
            .filter((c) => c.trending)
            .map((c) => (
              <div
                key={c.id}
                className="bg-[#18181b] border border-orange-400 rounded-xl p-4 flex flex-col items-center shadow"
              >
                <div className="text-2xl font-bold text-orange-200 mb-1">
                  {c.symbol}
                </div>
                <div className="text-white mb-1">{c.name}</div>
                <div className="text-gray-300 text-xs mb-2">
                  {c.listed}
                </div>
                <button
                  onClick={() => toggleStar(c.id)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-800 text-white font-bold text-xs shadow hover:bg-orange-700"
                >
                  <FaStar
                    className={
                      starred[c.id]
                        ? "text-yellow-300"
                        : "text-gray-400"
                    }
                  />{" "}
                  {starred[c.id] ? "Watching" : "Watch"}
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Upcoming Launches */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FaClock className="text-blue-400" />
          <span className="text-lg font-bold text-blue-300">
            Upcoming Launches
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          {DEMO_UPCOMING.map((u, i) => (
            <div
              key={i}
              className="bg-[#18181b] border border-blue-500 rounded-xl p-4 flex flex-col items-center shadow"
            >
              <div className="text-2xl font-bold text-blue-200 mb-1">
                {u.symbol}
              </div>
              <div className="text-white mb-1">{u.name}</div>
              <div className="text-blue-300 text-xs mb-1">
                {u.type} • {u.launch}
              </div>
              <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-800 text-white font-bold text-xs shadow hover:bg-blue-700">
                <FaStar className="text-gray-400" /> Watch
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-[#18181b] rounded-xl">
          <thead>
            <tr className="text-gray-300 text-left text-xs">
              <th className="px-4 py-2">Watch</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Market Cap</th>
              <th className="px-4 py-2">Listed</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-[#232] border-b border-[#222] transition"
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStar(coin.id)}
                    title={starred[coin.id] ? "Unwatch" : "Watch"}
                  >
                    <FaStar
                      className={`text-lg ${
                        starred[coin.id]
                          ? "text-yellow-400"
                          : "text-gray-400 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 font-bold">{coin.symbol}</td>
                <td className="px-4 py-3">{coin.name}</td>
                <td className="px-4 py-3">${coin.price}</td>
                <td className="px-4 py-3">
                  ${formatNum(coin.marketCap)}
                </td>
                <td className="px-4 py-3">{coin.listed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {coins.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No new coins found.
          </div>
        )}
      </div>
    </div>
  );
}
