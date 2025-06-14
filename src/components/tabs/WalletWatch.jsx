import React, { useState } from "react";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";

// Get your Etherscan API key from .env (VITE_ETHERSCAN_API_KEY)
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// Utilities to get/set watched wallets from localStorage
function getWatchedWallets() {
  try {
    return JSON.parse(localStorage.getItem("wallets")) || [];
  } catch {
    return [];
  }
}
function setWatchedWallets(list) {
  localStorage.setItem("wallets", JSON.stringify(list));
}

export default function WalletWatch() {
  const [wallets, setWallets] = useState(getWatchedWallets());
  const [newAddr, setNewAddr] = useState("");
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch ETH balance for an address using Etherscan API
  async function fetchBalance(addr) {
    setLoading(true);
    try {
      const url = `https://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setBalances((prev) => ({
        ...prev,
        [addr]: data.result ? Number(data.result) / 1e18 : 0,
      }));
    } catch (err) {
      setBalances((prev) => ({
        ...prev,
        [addr]: 0,
      }));
    }
    setLoading(false);
  }

  function addWallet() {
    if (!newAddr) return;
    const updated = [...wallets, newAddr];
    setWallets(updated);
    setWatchedWallets(updated);
    setNewAddr("");
    fetchBalance(newAddr);
  }

  function removeWallet(addr) {
    const updated = wallets.filter((a) => a !== addr);
    setWallets(updated);
    setWatchedWallets(updated);
    setBalances((prev) => {
      const { [addr]: _, ...rest } = prev;
      return rest;
    });
  }

  return (
    <div className="max-w-2xl mx-auto px-2 pt-6 pb-16">
      <div className="flex items-center gap-3 mb-8">
        <FaEye className="text-blue-400 text-2xl" />
        <h2 className="text-2xl font-bold text-white flex-1">Whale Wallet Watch</h2>
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="rounded-lg px-3 py-2 text-black w-full"
          placeholder="Ethereum wallet address (0x...)"
          value={newAddr}
          onChange={e => setNewAddr(e.target.value)}
        />
        <button
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
          onClick={addWallet}
        >
          <FaPlus /> Add
        </button>
      </div>
      {wallets.length === 0 ? (
        <div className="text-gray-400 mt-10 text-center">
          No wallets tracked yet. Add any Ethereum address above!
        </div>
      ) : (
        <table className="min-w-full bg-[#18181b] rounded-xl mt-4">
          <thead>
            <tr className="text-gray-300 text-left text-xs">
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">ETH Balance</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((addr) => (
              <tr key={addr} className="hover:bg-[#222] transition border-b border-[#232]">
                <td className="px-4 py-3 font-mono text-xs break-all">{addr}</td>
                <td className="px-4 py-3">
                  {balances[addr] !== undefined
                    ? balances[addr].toLocaleString(undefined, { maximumFractionDigits: 4 })
                    : (
                      <button onClick={() => fetchBalance(addr)} className="text-blue-400 underline">
                        Fetch
                      </button>
                    )}
                </td>
                <td className="px-4 py-3">
                  <button className="bg-[#222] rounded-full p-2 hover:bg-[#333] text-red-400"
                          onClick={() => removeWallet(addr)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-10 text-xs text-gray-400 text-center">
        <span>Uses Etherscan API (ETH only). Other chains and transaction history coming soon!</span>
      </div>
    </div>
  );
}
