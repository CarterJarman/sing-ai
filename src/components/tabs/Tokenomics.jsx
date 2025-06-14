// src/components/tabs/Tokenomics.jsx

import React from "react";
import { FaChartPie, FaLock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// Demo data for one coin, e.g., "AICoin"
const DEMO = {
  symbol: "AIC",
  name: "AI Coin",
  circSupply: 150_000_000,
  maxSupply: 500_000_000,
  fdv: 230_000_000,
  circulatingMarketCap: 69_000_000,
  emissions: 2_000_000, // tokens per month
  unlocks: [
    { date: "2024-06-18", amount: 10_000_000, description: "Team unlock" },
    { date: "2024-07-01", amount: 20_000_000, description: "Ecosystem" },
    { date: "2024-07-10", amount: 12_000_000, description: "Investors" },
  ],
  holders: [
    { address: "0x123...A", percent: 18, label: "VC 1" },
    { address: "0x456...B", percent: 7.2, label: "Founders" },
    { address: "0x789...C", percent: 3.5, label: "Treasury" },
  ],
  aiSafety: {
    status: "warning",
    note:
      "High unlock event detected in next 30 days. Over 10% of max supply will be released, which may cause price volatility. Top holder controls 18%. Caution advised during upcoming unlocks.",
  },
};

function percent(val, total) {
  if (!total) return "0";
  return ((val / total) * 100).toFixed(2) + "%";
}

function Progress({ value, max }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full bg-[#232] rounded-full h-3">
      <div
        className="h-3 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full"
        style={{ width: `${pct}%` }}
      ></div>
    </div>
  );
}

export default function Tokenomics() {
  return (
    <div className="max-w-3xl mx-auto px-2 pt-6 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <FaChartPie className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white">
          Tokenomics: {DEMO.name} <span className="text-blue-400">({DEMO.symbol})</span>
        </h2>
      </div>

      {/* Supply Info */}
      <div className="bg-[#18181b] border border-[#222] rounded-2xl p-6 mb-8 shadow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
          <div>
            <div className="text-gray-300 text-xs mb-1">Circulating Supply</div>
            <div className="font-bold text-lg text-white">{DEMO.circSupply.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-300 text-xs mb-1">Max Supply</div>
            <div className="font-bold text-lg text-white">{DEMO.maxSupply.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-300 text-xs mb-1">FDV</div>
            <div className="font-bold text-lg text-white">${DEMO.fdv.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-300 text-xs mb-1">Emissions (monthly)</div>
            <div className="font-bold text-lg text-white">{DEMO.emissions.toLocaleString()} AIC</div>
          </div>
        </div>
        {/* Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Circulating</span>
            <span>{percent(DEMO.circSupply, DEMO.maxSupply)} of max</span>
          </div>
          <Progress value={DEMO.circSupply} max={DEMO.maxSupply} />
        </div>
      </div>

      {/* Unlocks/vesting */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FaLock className="text-yellow-400" />
          <span className="text-lg font-bold text-yellow-300">Upcoming Unlocks / Vesting</span>
        </div>
        {DEMO.unlocks.length === 0 ? (
          <div className="text-gray-400">No scheduled unlocks.</div>
        ) : (
          <div className="space-y-3">
            {DEMO.unlocks.map((u, i) => (
              <div key={i} className="bg-[#222] rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-white">{u.description}</div>
                  <div className="text-gray-400 text-xs">{u.date}</div>
                </div>
                <div className="font-bold text-yellow-200">{u.amount.toLocaleString()} AIC</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Whale/Holder breakdown */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FaChartPie className="text-purple-400" />
          <span className="text-lg font-bold text-purple-300">Top Holders</span>
        </div>
        <div className="space-y-3">
          {DEMO.holders.map((h, i) => (
            <div key={i} className="flex justify-between bg-[#232] rounded-lg p-3">
              <div>
                <span className="font-semibold text-white">{h.label || h.address}</span>
                <span className="ml-2 text-gray-400 text-xs">{h.address}</span>
              </div>
              <div className="font-bold text-purple-200">{h.percent}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Safety Analysis */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-2">
          {DEMO.aiSafety.status === "warning" ? (
            <FaExclamationTriangle className="text-yellow-400" />
          ) : (
            <FaCheckCircle className="text-green-400" />
          )}
          <span
            className={`text-lg font-bold ${
              DEMO.aiSafety.status === "warning"
                ? "text-yellow-300"
                : "text-green-300"
            }`}
          >
            Token Safety
          </span>
        </div>
        <div
          className={`rounded-xl p-4 ${
            DEMO.aiSafety.status === "warning"
              ? "bg-yellow-900/60 border border-yellow-600 text-yellow-100"
              : "bg-green-900/50 border border-green-600 text-green-100"
          }`}
        >
          {DEMO.aiSafety.note}
        </div>
      </div>
    </div>
  );
}
