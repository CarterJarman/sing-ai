// src/components/tabs/APISources.jsx

import React, { useState } from "react";
import { FaNetworkWired, FaKey, FaPlug } from "react-icons/fa";

const APIS = [
  {
    id: "coingecko",
    name: "CoinGecko",
    enabled: true,
    features: ["Scanner", "New Coins", "Tokenomics"],
    apiKey: null,
    custom: false,
    docs: "https://www.coingecko.com/en/api/documentation",
  },
  {
    id: "dexscreener",
    name: "DexScreener",
    enabled: false,
    features: ["DEX New Coins", "Chart Vision (future)"],
    apiKey: null,
    custom: false,
    docs: "https://docs.dexscreener.com",
  },
  {
    id: "cmc",
    name: "CoinMarketCap",
    enabled: false,
    features: ["Scanner", "Tokenomics"],
    apiKey: "",
    custom: false,
    docs: "https://coinmarketcap.com/api/documentation/v1/",
  },
  {
    id: "custom",
    name: "Custom API",
    enabled: false,
    features: ["(Any - for developers)"],
    apiKey: "",
    custom: true,
    docs: "",
  },
];

export default function APISources() {
  const [sources, setSources] = useState(APIS);

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
          Enable or disable which APIs power your data. <br className="hidden md:block"/>
          <span className="text-sm text-gray-400">
            (You can safely toggle—demo data is used unless a real API key is added.)
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
                  {src.custom || src.id === "cmc" ? (
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
                  {src.custom && (
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
        Want to add a new source or connect your own API? <br />
        Contact support or <a href="#" className="text-blue-400 hover:underline">request a feature</a>.
      </div>
    </div>
  );
}
