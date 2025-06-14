// src/components/tabs/Tokenomics.jsx

import React, { useEffect, useState } from "react";
import { FaChartPie, FaLock } from "react-icons/fa";

// Helper for nice numbers
function formatNum(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num?.toLocaleString() ?? "";
}

const DEFAULT_COINS = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "solana", name: "Solana" },
];

export default function Tokenomics() {
  const [coinId, setCoinId] = useState(DEFAULT_COINS[0].id);
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [allCoins, setAllCoins] = useState([]);

  // Fetch all coins for search
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((res) => res.json())
      .then(setAllCoins)
      .catch(() => setAllCoins([]));
  }, []);

  // Fetch tokenomics for selected coin
  useEffect(() => {
    if (!coinId) return;
    setLoading(true);
    setErr("");
    setCoinData(null);
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setCoinData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [coinId]);

  // Search for coins
  const foundCoins =
    search.length > 1
      ? allCoins
          .filter(
            (c) =>
              c.symbol.toLowerCase().includes(search.toLowerCase()) ||
              c.id.toLowerCase().includes(search.toLowerCase()) ||
              c.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 15)
      : [];

  return (
    <div className="max-w-3xl mx-auto px-2 pt-6 pb-16">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <FaChartPie className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white flex-1">
          Tokenomics:{" "}
          {coinData?.name ? (
            <>
              {coinData.name}
              <span className="text-blue-400"> ({coinData.symbol?.toUpperCase()})</span>
            </>
          ) : (
            coinId
          )}
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search coin..."
            className="rounded-lg px-3 py-2 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && foundCoins.length > 0 && (
            <div className="absolute z-50 bg-[#18181b] text-white border rounded-lg shadow w-64 max-h-52 overflow-auto mt-2">
              {foundCoins.map((c) => (
                <div
                  key={c.id}
                  className="px-3 py-2 hover:bg-[#2563eb] hover:text-white cursor-pointer"
                  onClick={() => {
                    setCoinId(c.id);
                    setSearch("");
                  }}
                >
                  {c.symbol.toUpperCase()} - {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-blue-300 animate-pulse py-10">Loading tokenomics...</div>
      ) : err ? (
        <div className="text-red-400 py-8">{err}</div>
      ) : !coinData ? (
        <div className="text-gray-400">No data</div>
      ) : (
        <>
          <div className="bg-[#18181b] border border-[#222] rounded-2xl p-6 mb-8 shadow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
              <div>
                <div className="text-gray-300 text-xs mb-1">Circulating Supply</div>
                <div className="font-bold text-lg text-white">{formatNum(coinData.market_data.circulating_supply)}</div>
              </div>
              <div>
                <div className="text-gray-300 text-xs mb-1">Max Supply</div>
                <div className="font-bold text-lg text-white">
                  {coinData.market_data.max_supply
                    ? formatNum(coinData.market_data.max_supply)
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-gray-300 text-xs mb-1">Market Cap</div>
                <div className="font-bold text-lg text-white">
                  ${formatNum(coinData.market_data.market_cap.usd)}
                </div>
              </div>
              <div>
                <div className="text-gray-300 text-xs mb-1">FDV</div>
                <div className="font-bold text-lg text-white">
                  {coinData.market_data.fully_diluted_valuation?.usd
                    ? "$" + formatNum(coinData.market_data.fully_diluted_valuation.usd)
                    : "—"}
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Circulating</span>
                <span>
                  {coinData.market_data.max_supply
                    ? ((coinData.market_data.circulating_supply /
                        coinData.market_data.max_supply) *
                        100
                      ).toFixed(2) + "% of max"
                    : ""}
                </span>
              </div>
              {coinData.market_data.max_supply && (
                <div className="w-full bg-[#232] rounded-full h-3">
                  <div
                    className="h-3 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full"
                    style={{
                      width: `${
                        (coinData.market_data.circulating_supply /
                          coinData.market_data.max_supply) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FaLock className="text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">
                Unlocks / Vesting
              </span>
            </div>
            <div className="text-gray-400">
              Unlock/vesting schedule data is not available via CoinGecko’s free API. For major unlocks, check TokenUnlocks.com.
            </div>
          </div>
          {/* Top Holders */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FaChartPie className="text-purple-400" />
              <span className="text-lg font-bold text-purple-300">Top Holders</span>
            </div>
            <div className="text-gray-400">
              Top holders (whale) data is not available via CoinGecko’s free API. For top holders, use Covalent, Etherscan, or BscScan APIs.
            </div>
          </div>
        </>
      )}
    </div>
  );
}