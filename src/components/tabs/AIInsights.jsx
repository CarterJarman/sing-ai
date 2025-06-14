// src/components/tabs/AIInsights.jsx

import React, { useState } from "react";
import { FaRobot, FaShieldAlt, FaBolt, FaSmile, FaFrown, FaMeh } from "react-icons/fa";

// Demo news & sentiment
const DEMO_NEWS = [
  {
    id: 1,
    title: "ETH ETF Approval Likely This Month, Says Bloomberg Analyst",
    url: "https://www.bloomberg.com/crypto/eth-etf-news",
    source: "Bloomberg",
    date: "2024-06-12",
    sentiment: "bullish",
    summary: "Institutional demand for Ethereum surges after ETF rumors.",
  },
  {
    id: 2,
    title: "Tether Pauses USDT Minting on Solana Amid Regulatory Scrutiny",
    url: "https://cointelegraph.com/news/tether-pauses-solana",
    source: "Cointelegraph",
    date: "2024-06-11",
    sentiment: "bearish",
    summary: "Pausing mints raises concerns over stablecoin compliance and liquidity.",
  },
  {
    id: 3,
    title: "Vitalik Buterin Proposes Ethereum Scaling Roadmap",
    url: "https://twitter.com/VitalikButerin/status/179231232323",
    source: "Twitter",
    date: "2024-06-10",
    sentiment: "neutral",
    summary: "Focus on Layer 2s and data availability for long-term growth.",
  },
];

// Simulated AI risk/insight
const DEMO_RISKS = [
  {
    type: "Regulation",
    risk: "Possible SEC announcement on altcoins classified as securities.",
    severity: "high",
  },
  {
    type: "Security",
    risk: "DeFi exploit volume up 12% week-on-week; 4 new vulnerabilities disclosed.",
    severity: "moderate",
  },
  {
    type: "Sentiment",
    risk: "Social sentiment mixed: memecoins overheating, majors consolidating.",
    severity: "info",
  },
];

function sentimentIcon(s) {
  if (s === "bullish")
    return <FaSmile className="text-green-400 inline mb-1" title="Bullish" />;
  if (s === "bearish")
    return <FaFrown className="text-red-400 inline mb-1" title="Bearish" />;
  return <FaMeh className="text-yellow-400 inline mb-1" title="Neutral" />;
}

function riskColor(sev) {
  return sev === "high"
    ? "bg-red-900 border-red-500 text-red-100"
    : sev === "moderate"
    ? "bg-yellow-900 border-yellow-500 text-yellow-100"
    : "bg-blue-900 border-blue-500 text-blue-100";
}

export default function AIInsights() {
  const [news, setNews] = useState(DEMO_NEWS);
  const [risks, setRisks] = useState(DEMO_RISKS);
  const [thinking, setThinking] = useState(false);

  function runAI() {
    setThinking(true);
    setTimeout(() => {
      // Simulate adding a random insight/news (rotate)
      setNews((prev) =>
        [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]
      );
      setRisks((prev) =>
        [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]
      );
      setThinking(false);
    }, 2000);
  }

  return (
    <div className="max-w-3xl mx-auto px-2 pt-8 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white">AI Insights & News</h2>
      </div>

      {/* Risk & Safety */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FaShieldAlt className="text-green-400" />
          <span className="text-lg font-bold text-green-300">Risk & Safety</span>
        </div>
        <div className="space-y-3">
          {risks.map((r, i) => (
            <div
              key={i}
              className={`border-l-4 rounded-r-xl px-4 py-3 mb-1 font-semibold shadow ${riskColor(
                r.severity
              )}`}
            >
              <span className="uppercase mr-2 text-xs opacity-80">{r.type}:</span>
              {r.risk}
            </div>
          ))}
        </div>
      </div>

      {/* Run AI Analysis */}
      <div className="flex items-center mb-8">
        <button
          className="flex items-center gap-2 px-6 py-2 bg-[#2563eb] text-white font-bold rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400"
          onClick={runAI}
          disabled={thinking}
        >
          <FaBolt />
          {thinking ? "AI is thinking..." : "Run AI Analysis"}
        </button>
        {thinking && (
          <span className="ml-4 animate-pulse text-blue-400 font-bold text-lg">Analyzing...</span>
        )}
      </div>

      {/* News & Sentiment */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FaBolt className="text-yellow-400" />
          <span className="text-lg font-bold text-yellow-300">Latest News & Sentiment</span>
        </div>
        <div className="space-y-4">
          {news.map((n) => (
            <div
              key={n.id}
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
                <div className="text-gray-300 text-xs">{n.source} — {n.date}</div>
                <div className="text-gray-100">{n.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
