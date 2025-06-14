// src/components/tabs/Scanner.jsx

import React, { useState, useEffect } from "react";
import { FaStar, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

// Helper to format large numbers
function formatNum(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num?.toString() ?? "";
}

export default function Scanner() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("market_cap");
  const [sortDir, setSortDir] = useState("desc");
  const [error, setError] = useState(null);

  // Fetch coins from CoinGecko API
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch CoinGecko API");
        return res.json();
      })
      .then(setCoins)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtered coins
  let filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Sort coins
  filtered = [...filtered].sort((a, b) => {
    const vA = a[sortKey] ?? 0;
    const vB = b[sortKey] ?? 0;
    if (vA === vB) return 0;
    return sortDir === "asc" ? vA - vB : vB - vA;
  });

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
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
        <button
          className="px-3 py-1 rounded-lg font-bold text-xs bg-[#222] text-gray-300 hover:bg-[#333] ml-2"
          onClick={() => setSearch("")}
        >
          <MdRefresh /> Clear
        </button>
      </div>
      {loading ? (
        <div className="text-center text-blue-300 py-10 text-lg animate-pulse">
          Loading live data from CoinGecko...
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-8">
          Error: {error}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-[#18181b] rounded-xl">
              <thead>
                <tr className="text-gray-300 text-left text-xs">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Name</th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => toggleSort("current_price")}
                  >
                    Price <FaSortAmountDown className="inline ml-1" />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => toggleSort("market_cap")}
                  >
                    Market Cap <FaSortAmountDown className="inline ml-1" />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => toggleSort("total_volume")}
                  >
                    Volume <FaSortAmountDown className="inline ml-1" />
                  </th>
                  <th className="px-4 py-2">% 24h</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((coin, idx) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-[#232] border-b border-[#222] transition"
                  >
                    <td className="px-4 py-3">{coin.market_cap_rank || idx + 1}</td>
                    <td className="px-4 py-3 font-bold">{coin.symbol.toUpperCase()}</td>
                    <td className="px-4 py-3">{coin.name}</td>
                    <td className="px-4 py-3">${coin.current_price.toLocaleString()}</td>
                    <td className="px-4 py-3">${formatNum(coin.market_cap)}</td>
                    <td className="px-4 py-3">${formatNum(coin.total_volume)}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : coin.price_change_percentage_24h < 0
                          ? "text-red-400"
                          : "text-gray-200"
                      }`}
                    >
                      {coin.price_change_percentage_24h > 0 && "+"}
                      {coin.price_change_percentage_24h?.toFixed(2) ?? "--"}%
                    </td>
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
        </>
      )}
    </div>
  );
}
