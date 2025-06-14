import React, { useState, useEffect } from "react";
import { FaDollarSign, FaPlus, FaTrash } from "react-icons/fa";

// Helper: format number as currency
function formatCurrency(num) {
  return "$" + Number(num).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function getPortfolio() {
  try {
    return JSON.parse(localStorage.getItem("portfolio")) || [];
  } catch {
    return [];
  }
}
function setPortfolio(p) {
  localStorage.setItem("portfolio", JSON.stringify(p));
}

export default function Portfolio() {
  const [holdings, setHoldings] = useState(getPortfolio());
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch prices for all coins in portfolio
  useEffect(() => {
    if (!holdings.length) return;
    setLoading(true);
    const ids = holdings.map(h => h.coin).join(",");
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
      .then(res => res.json())
      .then(setPrices)
      .finally(() => setLoading(false));
  }, [holdings]);

  function addHolding() {
    if (!coin || !amount) return;
    const next = [...holdings, { coin: coin.toLowerCase(), amount: Number(amount) }];
    setHoldings(next);
    setPortfolio(next);
    setCoin("");
    setAmount("");
  }
  function removeHolding(idx) {
    const next = holdings.filter((_, i) => i !== idx);
    setHoldings(next);
    setPortfolio(next);
  }
  // Calculate totals
  const totalValue = holdings.reduce((sum, h) => sum + ((prices[h.coin]?.usd || 0) * h.amount), 0);

  return (
    <div className="max-w-2xl mx-auto px-2 pt-6 pb-16">
      <div className="flex items-center gap-3 mb-8">
        <FaDollarSign className="text-green-400 text-2xl" />
        <h2 className="text-2xl font-bold text-white flex-1">Your Portfolio</h2>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="rounded-lg px-3 py-2 text-black"
          placeholder="Coin (e.g. bitcoin)"
          value={coin}
          onChange={e => setCoin(e.target.value)}
        />
        <input
          type="number"
          className="rounded-lg px-3 py-2 text-black"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
          onClick={addHolding}
        >
          <FaPlus /> Add
        </button>
      </div>
      {holdings.length === 0 ? (
        <div className="text-gray-400 mt-10 text-center">
          No holdings yet. Add coins above to start tracking your portfolio!
        </div>
      ) : (
        <table className="min-w-full bg-[#18181b] rounded-xl mt-4">
          <thead>
            <tr className="text-gray-300 text-left text-xs">
              <th className="px-4 py-2">Coin</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, idx) => (
              <tr key={idx} className="hover:bg-[#222] transition border-b border-[#232]">
                <td className="px-4 py-3 font-bold">{h.coin}</td>
                <td className="px-4 py-3">{h.amount}</td>
                <td className="px-4 py-3">{prices[h.coin] ? formatCurrency(prices[h.coin].usd) : "—"}</td>
                <td className="px-4 py-3">{prices[h.coin] ? formatCurrency(prices[h.coin].usd * h.amount) : "—"}</td>
                <td className="px-4 py-3">
                  <button className="bg-[#222] rounded-full p-2 hover:bg-[#333] text-red-400"
                          onClick={() => removeHolding(idx)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-right mt-6 text-xl font-bold text-white">
        Total Portfolio Value: <span className="text-green-400">{formatCurrency(totalValue)}</span>
      </div>
    </div>
  );
}
