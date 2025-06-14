// src/components/tabs/AIInsights.jsx

import React, { useEffect, useState } from "react";
import { FaRobot, FaBolt, FaFrown, FaSmile, FaMeh } from "react-icons/fa";

const CRYPTOPANIC_KEY = ""; // <-- Paste your API key here if you have one

export default function AIInsights() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentiment, setSentiment] = useState("neutral");

  useEffect(() => {
    setLoading(true);
    if (CRYPTOPANIC_KEY) {
      // Fetch real news from CryptoPanic
      fetch(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_KEY}&public=true`
      )
        .then((res) => res.json())
        .then((data) => {
          setNews(
            (data.results || []).map((item) => ({
              title: item.title,
              url: item.url,
              source: item.source?.title ?? "News",
              date: item.created_at?.slice(0, 10),
              summary: item.domain,
              sentiment: item.votes?.positive > item.votes?.negative
                ? "bullish"
                : item.votes?.negative > item.votes?.positive
                ? "bearish"
                : "neutral",
            }))
          );
          setSentiment("neutral"); // You can improve this by aggregating sentiment from posts
        })
        .catch(() => setNews([]))
        .finally(() => setLoading(false));
    } else {
      // Fallback: Trending coins and demo news
      fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      )
        .then((res) => res.json())
        .then((data) => {
          setNews(
            (data.coins || []).map((c) => ({
              title: `${c.item.symbol}: ${c.item.name} is trending`,
              url: `https://www.coingecko.com/en/coins/${c.item.id}`,
              source: "CoinGecko",
              date: new Date().toISOString().slice(0, 10),
              summary: `Rank: ${c.item.market_cap_rank}`,
              sentiment: c.item.score < 3 ? "bearish" : c.item.score > 4 ? "bullish" : "neutral",
            }))
          );
          setSentiment("neutral");
        })
        .catch(() =>
          setNews([
            {
              title: "ETH ETF Approval Likely This Month, Says Bloomberg Analyst",
              url: "#",
              source: "Bloomberg",
              date: "2024-06-12",
              summary: "",
              sentiment: "bullish",
            },
            {
              title: "Tether Pauses USDT Minting on Solana Amid Regulatory Scrutiny",
              url: "#",
              source: "Cointelegraph",
              date: "2024-06-11",
              summary: "",
              sentiment: "bearish",
            },
          ])
        )
        .finally(() => setLoading(false));
    }
  }, []);

  function sentimentIcon(s) {
    if (s === "bullish") return <FaSmile className="text-green-400 inline mb-1" title="Bullish" />;
    if (s === "bearish") return <FaFrown className="text-red-400 inline mb-1" title="Bearish" />;
    return <FaMeh className="text-yellow-400 inline mb-1" title="Neutral" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-2 pt-8 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white">AI Insights & News</h2>
      </div>
      <div className="flex items-center mb-8 gap-3">
        <span className="text-lg font-semibold text-white">
          Sentiment:
        </span>
        {sentimentIcon(sentiment)}
        <span
          className={`capitalize font-bold text-lg ${
            sentiment === "bullish"
              ? "text-green-400"
              : sentiment === "bearish"
              ? "text-red-400"
              : "text-yellow-300"
          }`}
        >
          {sentiment}
        </span>
      </div>
      {loading ? (
        <div className="text-blue-400 text-lg py-8 animate-pulse">Loading latest crypto news…</div>
      ) : (
        <div className="space-y-5">
          {news.map((n, i) => (
            <div
              key={i}
              className="bg-[#18181b] border border-[#232] rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 shadow"
            >
              <div className="flex items-center gap-2 min-w-[95px]">
                {sentimentIcon(n.sentiment)}
                <span className="capitalize font-semibold text-lg text-white">
                  {n.sentiment}
                </span>
              </div>
              <div className="flex-1">
                <a
                  href={n.url}
                  className="text-blue-400 hover:underline font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {n.title}
                </a>
                <div className="text-gray-300 text-xs">
                  {n.source} — {n.date}
                </div>
                {n.summary && (
                  <div className="text-gray-100">{n.summary}</div>
                )}
              </div>
            </div>
          ))}
          {news.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No news found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}