// src/components/tabs/Scanner.jsx

import React, { useState } from "react";
import { FaStar, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

// Demo coin data (simulate API results)
const DEMO_COINS = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67000,
    marketCap: 1320000000000,
    volume: 48000000000,
    change24h: 2.1,
    starred: false,
    category: "L1",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3450,
    marketCap: 420000000000,
    volume: 22000000000,
    change24h: -0.8,
    starred: true,
    category: "L1",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 148,
    marketCap: 67000000000,
    volume: 3700000000,
    change24h: 4.7,
    starred: false,
    category: "L1",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.165,
    marketCap: 24000000000,
    volume: 2000000000,
    change24h: 5.9,
    starred: false,
    category: "Meme",
  },
  {
    id: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    price: 1.24,
    marketCap: 3300000000,
    volume: 900000000,
    change24h: -3.2,
    starred: false,
    category: "L2",
  },
  {
    id: "bonk",
    symbol: "BONK",
    name: "Bonk",
    price: 0.000026,
    marketCap: 1680000000,
    volume: 700000000,
    change24h: 15.2,
    starred: false,
    category: "Meme",
  },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    price: 0.000012,
    marketCap: 600000000,
    volume: 180000000,
    change24h: 9.5,
    starred: false,
    category: "Meme",
  },
];

const CATEGORIES = ["All", "L1", "L2", "Meme"];

function formatNum(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toString();
}

export default function Scanner() {
  const [coins, setCoins] = useState(DEMO_COINS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("marketCap");
  const [sortDir, setSortDir] = useState("desc");
  const [filterGainers, setFilterGainers] = useState(false);
  const [filterTrending, setFilterTrending] = useState(false);

  // Filtering
  let filtered = coins.filter((c) =>
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()))
  );
  if (category !== "All") {
    filtered = filtered.filter((c) => c.category === category);
  }
  if (filterGainers) {
    filtered = filtered.filter((c) => c.change24h > 5);
  }
  if (filterTrending) {
    filtered = filtered.filter((c) => Math.abs(c.change24h) > 4);
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    const vA = a[sortKey];
    const vB = b[sortKey];
    if (vA === vB) return 0;
    return sortDir === "asc" ? vA - vB : vB - vA;
  });

  // Star/unstar logic (adds to "watchlist" in demo)
  function toggleStar(id) {
    setCoins(
      coins.map((c) =>
        c.id === id ? { ...c, starred: !c.starred } : c
      )
    );
  }

  // Presets
  function presetTopGainers() {
    setSearch("");
    setCategory("All");
    setFilterGainers(true);
    setFilterTrending(false);
  }
  function presetTrending() {
    setSearch("");
    setCategory("All");
    setFilterGainers(false);
    setFilterTrending(true);
  }
  function presetFavorites() {
    setSearch("");
    setCategory("All");
    setFilterGainers(false);
    setFilterTrending(false);
    setCoins(
      DEMO_COINS.filter((c) => c.starred)
    );
  }
  function clearFilters() {
    setSearch("");
    setCategory("All");
    setFilterGainers(false);
    setFilterTrending(false);
    setCoins(DEMO_COINS);
  }

  return (
    <div className="max-w-6xl mx-auto px-2 pt-4 pb-10">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#18181b] rounded-xl shadow border border-[#232]">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            className="bg-transparent outline-none text-white w-32"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg px-3 py-1 text-gray-900"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button
          className={`px-3 py-1 rounded-lg font-bold text-xs ${
            filterGainers
              ? "bg-green-500 text-white"
              : "bg-[#222] text-green-300 hover:bg-green-800"
          }`}
          onClick={presetTopGainers}
        >
          Top Gainers
        </button>
        <button
          className={`px-3 py-1 rounded-lg font-bold text-xs ${
            filterTrending
              ? "bg-yellow-500 text-white"
              : "bg-[#222] text-yellow-300 hover:bg-yellow-800"
          }`}
          onClick={presetTrending}
        >
          Trending
        </button>
        <button
          className="px-3 py-1 rounded-lg font-bold text-xs bg-[#222] text-blue-300 hover:bg-blue-800"
          onClick={presetFavorites}
        >
          My Favorites
        </button>
        <button
          className="px-3 py-1 rounded-lg font-bold text-xs bg-[#222] text-gray-300 hover:bg-[#333] ml-2"
          onClick={clearFilters}
        >
          <MdRefresh /> Clear
        </button>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-[#18181b] rounded-xl">
          <thead>
            <tr className="text-gray-300 text-left text-xs">
              <th className="px-4 py-2">Star</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Name</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => {
                  setSortKey("price");
                  setSortDir(sortDir === "asc" ? "desc" : "asc");
                }}
              >
                Price <FaSortAmountDown className="inline ml-1" />
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => {
                  setSortKey("marketCap");
                  setSortDir(sortDir === "asc" ? "desc" : "asc");
                }}
              >
                Market Cap <FaSortAmountDown className="inline ml-1" />
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => {
                  setSortKey("volume");
                  setSortDir(sortDir === "asc" ? "desc" : "asc");
                }}
              >
                Volume <FaSortAmountDown className="inline ml-1" />
              </th>
              <th className="px-4 py-2">% 24h</th>
              <th className="px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-[#232] border-b border-[#222] transition"
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStar(coin.id)}
                    title={coin.starred ? "Unstar" : "Star"}
                  >
                    <FaStar
                      className={`text-xl ${
                        coin.starred
                          ? "text-yellow-400"
                          : "text-gray-500 hover:text-yellow-400"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 font-bold">{coin.symbol}</td>
                <td className="px-4 py-3">{coin.name}</td>
                <td className="px-4 py-3">${coin.price.toLocaleString()}</td>
                <td className="px-4 py-3">${formatNum(coin.marketCap)}</td>
                <td className="px-4 py-3">${formatNum(coin.volume)}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    coin.change24h > 0
                      ? "text-green-400"
                      : coin.change24h < 0
                      ? "text-red-400"
                      : "text-gray-200"
                  }`}
                >
                  {coin.change24h > 0 && "+"}
                  {coin.change24h.toFixed(2)}%
                </td>
                <td className="px-4 py-3">{coin.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No coins found for your filter.
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <span className="text-gray-400 text-lg mb-2">
          Save your favorite scans as presets (coming soon)
        </span>
        <button className="px-6 py-2 bg-[#2563eb] text-white font-bold rounded-xl shadow hover:bg-blue-700">
          Create Custom Filter (coming soon)
        </button>
      </div>
    </div>
  );
}
