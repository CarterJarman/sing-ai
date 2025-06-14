// src/components/tabs/Dashboard.jsx

import React, { useState } from "react";
import { FaStar, FaPlus, FaCog, FaBolt } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";

// Demo watchlist coins (could be loaded from localStorage or an API in V2)
const DEFAULT_WATCHLIST = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67123,
    change24h: 2.15,
    spark: [64000, 64600, 65500, 65000, 65800, 66000, 67123],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3470,
    change24h: -1.02,
    spark: [3300, 3350, 3400, 3425, 3450, 3490, 3470],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 150.87,
    change24h: 4.7,
    spark: [140, 143, 146, 147, 149, 150, 150.87],
  },
];

const DEMO_AI_INSIGHTS = [
  {
    title: "AI Alert: Unusual volume on ETH",
    date: "2024-06-10",
    type: "volume",
    detail:
      "Ethereum has experienced a 34% spike in trading volume over the last 24 hours. Technical analysis suggests possible accumulation ahead of volatility. No major whale inflows detected.",
    severity: "moderate",
  },
  {
    title: "BTC Support Holding Strong",
    date: "2024-06-09",
    type: "trend",
    detail:
      "Bitcoin is maintaining support at $65,800. AI model projects continued sideways movement unless volume breaks out. Risk: sudden macro event could cause rapid moves.",
    severity: "info",
  },
  {
    title: "SOL flagged for increased risk",
    date: "2024-06-08",
    type: "risk",
    detail:
      "Recent onchain analysis suggests possible high-frequency trading manipulation on Solana. Short-term traders should use caution; AI confidence: 80%.",
    severity: "warning",
  },
];

function Sparkline({ data }) {
  // Simple sparkline renderer (svg)
  if (!data || data.length < 2) return null;
  const w = 60,
    h = 24;
  const min = Math.min(...data),
    max = Math.max(...data);
  const norm = (v) =>
    h - ((v - min) / (max - min || 1)) * (h - 4) - 2; // 2px margin
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * (w - 2) + 1},${norm(v)}`)
    .join(" ");
  return (
    <svg width={w} height={h}>
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        points={pts}
        style={{ filter: "drop-shadow(0 0 2px #2563eb70)" }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState(DEFAULT_WATCHLIST);
  const [showAdd, setShowAdd] = useState(false);
  const [addSymbol, setAddSymbol] = useState("");

  // Simulate searching and adding coins
  const handleAdd = () => {
    if (!addSymbol) return;
    const fake = {
      id: addSymbol.toLowerCase(),
      symbol: addSymbol.toUpperCase(),
      name: `DemoCoin (${addSymbol.toUpperCase()})`,
      price: Math.random() * 1000 + 1,
      change24h: (Math.random() - 0.5) * 10,
      spark: Array.from({ length: 7 }, () =>
        Math.random() * 1000 + 1
      ),
    };
    setWatchlist([...watchlist, fake]);
    setAddSymbol("");
    setShowAdd(false);
  };

  const handleRemove = (id) => {
    setWatchlist(watchlist.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-2 pt-4 pb-12">
      {/* Watchlist Section */}
      <div className="mb-10">
        <div className="flex items-center mb-4 gap-4">
          <FaStar className="text-yellow-400 text-2xl" />
          <h2 className="text-2xl font-bold text-white flex-1">
            Your Watchlist
          </h2>
          <button
            onClick={() => setShowAdd((v) => !v)}
            className="bg-[#2563eb] hover:bg-blue-700 transition text-white rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 shadow"
          >
            <FaPlus /> Add Coin
          </button>
        </div>
        {showAdd && (
          <div className="flex gap-2 mb-3 items-center">
            <input
              type="text"
              placeholder="Coin symbol (e.g., DOGE)"
              value={addSymbol}
              onChange={(e) => setAddSymbol(e.target.value)}
              className="rounded-md p-2 text-gray-900"
            />
            <button
              onClick={handleAdd}
              className="bg-[#2563eb] text-white px-3 py-2 rounded font-bold hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="text-sm text-gray-300 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
        {watchlist.length === 0 ? (
          <div className="bg-[#18181b] rounded-xl p-8 text-center text-gray-400 shadow-inner mt-6">
            No coins in your watchlist. Click <b>Add Coin</b> to start tracking your favorite assets!
          </div>
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-[#18181b] rounded-xl">
              <thead>
                <tr className="text-gray-300 text-left text-sm">
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">% 24h</th>
                  <th className="px-4 py-2">Trend</th>
                  <th className="px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-[#222] transition border-b border-[#232]"
                  >
                    <td className="px-4 py-3 font-bold">{coin.symbol}</td>
                    <td className="px-4 py-3">{coin.name}</td>
                    <td className="px-4 py-3">${coin.price.toFixed(2)}</td>
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
                    <td className="px-4 py-3">
                      <Sparkline data={coin.spark} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-[#222] rounded-full p-2 hover:bg-[#333] text-red-400"
                        title="Remove"
                        onClick={() => handleRemove(coin.id)}
                      >
                        <MdRemoveRedEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* AI Insights Section */}
      <div>
        <div className="flex items-center mb-4 gap-3">
          <FaBolt className="text-blue-400 text-xl" />
          <h2 className="text-xl font-bold text-white flex-1">
            Recent AI Insights
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#222] rounded-lg text-gray-300 hover:bg-[#2563eb]/20 transition">
            <FaCog /> Customize
          </button>
        </div>
        {DEMO_AI_INSIGHTS.length === 0 ? (
          <div className="bg-[#18181b] rounded-xl p-8 text-center text-gray-400 shadow-inner mt-6">
            No insights yet. (They will appear here automatically as you use the app!)
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {DEMO_AI_INSIGHTS.map((insight, idx) => (
              <div
                key={idx}
                className={`rounded-xl border shadow p-4 ${
                  insight.severity === "warning"
                    ? "border-yellow-500"
                    : insight.severity === "moderate"
                    ? "border-blue-500"
                    : "border-gray-700"
                } bg-[#18181b]`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="font-semibold text-white">
                    {insight.title}
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      insight.severity === "warning"
                        ? "bg-yellow-900 text-yellow-300"
                        : insight.severity === "moderate"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {insight.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-gray-400 text-xs mb-1">
                  {insight.date}
                </div>
                <div className="text-gray-200 text-sm">
                  {insight.detail}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Customize Widget Section (optional future) */}
      <div className="mt-10 flex flex-col items-center">
        <span className="text-gray-400 text-lg mb-2">
          Want to customize your dashboard?
        </span>
        <button className="px-6 py-2 bg-[#2563eb] text-white font-bold rounded-xl shadow hover:bg-blue-700">
          Add Widget (coming soon)
        </button>
      </div>
    </div>
  );
}
