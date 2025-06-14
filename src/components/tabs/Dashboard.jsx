// src/components/tabs/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { FaStar, FaPlus, FaCog, FaBolt, FaTrash } from "react-icons/fa";

// Utility: get/set watchlist from localStorage
function getStoredWatchlist() {
  try {
    const data = JSON.parse(localStorage.getItem("watchlist")) || ["bitcoin", "ethereum"];
    return Array.isArray(data) ? data : [];
  } catch {
    return ["bitcoin", "ethereum"];
  }
}
function setStoredWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}

// Fetch all coins for "add" search
async function fetchAllCoinsList() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  if (!res.ok) throw new Error("Failed to fetch coins list");
  return await res.json();
}

// Fetch market data for specific coins
async function fetchMarkets(idsArr) {
  const ids = idsArr.join(",");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch coin markets");
  return await res.json();
}

// For demo: fallback news
const DEMO_NEWS = [
  {
    title: "ETH ETF Approval Likely This Month, Says Bloomberg Analyst",
    url: "https://www.bloomberg.com/crypto/eth-etf-news",
    source: "Bloomberg",
    date: "2024-06-12",
  },
  {
    title: "Tether Pauses USDT Minting on Solana Amid Regulatory Scrutiny",
    url: "https://cointelegraph.com/news/tether-pauses-solana",
    source: "Cointelegraph",
    date: "2024-06-11",
  },
];

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState(getStoredWatchlist());
  const [coinData, setCoinData] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [news, setNews] = useState([]);

  // Fetch all coin names for add/search
  useEffect(() => {
    fetchAllCoinsList()
      .then(setAllCoins)
      .catch(() => setAllCoins([]));
  }, []);

  // Fetch live coin data for watchlist
  useEffect(() => {
    if (!watchlist.length) {
      setCoinData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchMarkets(watchlist)
      .then(setCoinData)
      .catch((e) => setErr("Failed to fetch coin data: " + e.message))
      .finally(() => setLoading(false));
  }, [watchlist]);

  // Search for coins to add
  useEffect(() => {
    if (!search) setFilteredCoins([]);
    else
      setFilteredCoins(
        allCoins
          .filter(
            (c) =>
              c.symbol.toLowerCase().includes(search.toLowerCase()) ||
              c.id.toLowerCase().includes(search.toLowerCase()) ||
              c.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 15)
      );
  }, [search, allCoins]);

  // Fetch news (simple fallback using demo, or hook up real API)
  useEffect(() => {
    setNews(DEMO_NEWS);
    // For live news: fetch from CryptoPanic API if you have a key
    // fetch(`https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_TOKEN&public=true`)
    //   .then(res => res.json())
    //   .then(data => setNews(data.results || DEMO_NEWS))
    //   .catch(() => setNews(DEMO_NEWS));
  }, []);

  function addToWatchlist(id) {
    if (!watchlist.includes(id)) {
      const next = [...watchlist, id];
      setWatchlist(next);
      setStoredWatchlist(next);
    }
    setAddOpen(false);
    setSearch("");
  }

  function removeFromWatchlist(id) {
    const next = watchlist.filter((c) => c !== id);
    setWatchlist(next);
    setStoredWatchlist(next);
  }

  function formatNum(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num?.toString() ?? "";
  }

  return (
    <div className="max-w-5xl mx-auto px-2 pt-4 pb-12">
      {/* Watchlist */}
      <div className="mb-10">
        <div className="flex items-center mb-4 gap-4">
          <FaStar className="text-yellow-400 text-2xl" />
          <h2 className="text-2xl font-bold text-white flex-1">
            Your Watchlist
          </h2>
          <button
            onClick={() => setAddOpen((v) => !v)}
            className="bg-[#2563eb] hover:bg-blue-700 transition text-white rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 shadow"
          >
            <FaPlus /> Add Coin
          </button>
        </div>
        {addOpen && (
          <div className="flex gap-2 mb-3 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search by symbol, id, or name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md p-2 text-gray-900 min-w-[200px]"
            />
            {search && (
              <div className="bg-[#222] border rounded-lg shadow p-2 max-h-40 overflow-auto">
                {filteredCoins.length === 0 ? (
                  <div className="text-gray-400 px-2">No coins found</div>
                ) : (
                  filteredCoins.map((c) => (
                    <button
                      key={c.id}
                      className="block w-full text-left py-1 px-2 hover:bg-[#2563eb] hover:text-white rounded"
                      onClick={() => addToWatchlist(c.id)}
                      disabled={watchlist.includes(c.id)}
                    >
                      {c.symbol.toUpperCase()} - {c.name}
                      {watchlist.includes(c.id) && (
                        <span className="text-xs text-green-400 ml-2">Added</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
            <button
              onClick={() => {
                setAddOpen(false);
                setSearch("");
              }}
              className="text-sm text-gray-300 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}
        {loading ? (
          <div className="text-blue-300 text-lg animate-pulse py-8">Loading live prices...</div>
        ) : coinData.length === 0 ? (
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
                  <th className="px-4 py-2">Market Cap</th>
                  <th className="px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {coinData.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-[#222] transition border-b border-[#232]"
                  >
                    <td className="px-4 py-3 font-bold">{coin.symbol.toUpperCase()}</td>
                    <td className="px-4 py-3">{coin.name}</td>
                    <td className="px-4 py-3">${coin.current_price.toLocaleString()}</td>
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
                    <td className="px-4 py-3">${formatNum(coin.market_cap)}</td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-[#222] rounded-full p-2 hover:bg-[#333] text-red-400"
                        title="Remove"
                        onClick={() => removeFromWatchlist(coin.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {err && (
          <div className="text-red-400 text-xs py-2">{err}</div>
        )}
      </div>
      {/* AI Insights Section: News Headlines */}
      <div>
        <div className="flex items-center mb-4 gap-3">
          <FaBolt className="text-blue-400 text-xl" />
          <h2 className="text-xl font-bold text-white flex-1">
            Recent Crypto News
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#222] rounded-lg text-gray-300 hover:bg-[#2563eb]/20 transition">
            <FaCog /> Customize
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {news.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border shadow p-4 border-blue-500 bg-[#18181b]"
            >
              <div className="font-semibold text-white mb-2">
                <a href={item.url} className="hover:underline text-blue-400" target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </div>
              <div className="text-gray-400 text-xs">
                {item.source} — {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}