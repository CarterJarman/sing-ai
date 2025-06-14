// src/components/tabs/APISources.jsx

import React, { useState } from "react";
import { FaNetworkWired, FaKey, FaPlug, FaLock } from "react-icons/fa";

const API_LIST = [
  {
    id: "coingecko",
    name: "CoinGecko",
    enabled: true,
    features: ["Dashboard", "Scanner", "New Coins", "Tokenomics", "AI Insights (Trending)"],
    apiKey: null,
    docs: "https://www.coingecko.com/en/api/documentation",
    needsKey: false,
  },
  {
    id: "dexscreener",
    name: "DexScreener",
    enabled: true,
    features: ["New Coins (DEX)"],
    apiKey: null,
    docs: "https://docs.dexscreener.com",
    needsKey: false,
  },
  {
    id: "cryptopanic",
    name: "CryptoPanic",
    enabled: false,
    features: ["AI Insights (News & Sentiment)"],
    apiKey: "",
    docs: "https://cryptopanic.com/developers/api/",
    needsKey: true,
  },
  {
    id: "custom",
    name: "Custom API",
    enabled: false,
    features: ["(Advanced / Developers)"],
    apiKey: "",
    docs: "",
    needsKey: true,
  },
];

export default function APISources() {
  const [sources, setSources] = useState(API_LIST);

  function toggleEnabled(idx) {
    setSources((prev) =>
      prev.map((src, i) =>
        i === idx ? { ...src, enabled: !src.enabled } : src
      )
    );
  }

  function setApiKey(idx, val) {
    setSources((prev) =>
      prev.map((src, i) => (i === idx ? { ...src, apiKey: val } : src))
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2 pt-8 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <FaNetworkWired className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white">API Sources & Integrations</h2>
      </div>
      <div className="bg-[#18181b] border border-[#232] rounded-2xl shadow-xl p-6 mb-6">
        <div className="text-gray-200 mb-2">
          <FaPlug className="inline mr-2 text-blue-400" />
          Enable or disable which APIs power your app.  
          <span className="text-sm text-gray-400 block">
            (Settings saved per session for now. Feature list updates in real time!)
          </span>
        </div>
        <table className="min-w-full mt-3">
          <thead>
            <tr className="text-gray-400 text-left text-xs">
              <th className="px-4 py-2">Enable</th>
              <th className="px-4 py-2">API Name</th>
              <th className="px-4 py-2">Features</th>
              <th className="px-4 py-2">API Key</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sources.map((src, idx) => (
              <tr
                key={src.id}
                className="border-b border-[#232] hover:bg-[#222]/50 transition"
              >
                <td className="px-4 py-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!src.enabled}
                      onChange={() => toggleEnabled(idx)}
                      className="form-checkbox h-5 w-5 text-[#2563eb] rounded focus:ring-2 focus:ring-[#2563eb]"
                    />
                    <span className="ml-2 text-sm font-semibold">
                      {src.enabled ? "On" : "Off"}
                    </span>
                  </label>
                </td>
                <td className="px-4 py-2 font-bold text-white">
                  <a
                    href={src.docs || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[#2563eb]"
                  >
                    {src.name}
                  </a>
                </td>
                <td className="px-4 py-2 text-sm">
                  {src.features.join(", ")}
                </td>
                <td className="px-4 py-2">
                  {src.needsKey ? (
                    <input
                      type="text"
                      value={src.apiKey || ""}
                      onChange={(e) => setApiKey(idx, e.target.value)}
                      className="bg-[#222] border border-[#2563eb]/40 rounded px-2 py-1 text-white w-32 text-xs"
                      placeholder="Paste API key"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {src.needsKey && (
                    <button className="bg-[#2563eb] text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
                      <FaKey className="inline mr-1" />
                      Save Key
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-sm text-gray-400 text-center">
        Want to add or suggest new sources? <br />
        <a href="#" className="text-blue-400 hover:underline">Contact support</a>.
      </div>
    </div>
  );
}