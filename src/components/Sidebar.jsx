import React from "react";
import { AiOutlineDashboard, AiOutlineSearch, AiOutlineStar, AiOutlineClockCircle, AiOutlinePieChart, AiOutlineRobot, AiOutlineBook } from "react-icons/ai";
import { FaChartLine, FaDollarSign } from "react-icons/fa6";
import { FaNetworkWired } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const tabs = [
  { name: "Landing", icon: <AiOutlineDashboard /> },
  { name: "Portfolio", icon: <FaDollarSign /> },
  { name: "Dashboard", icon: <AiOutlineStar /> },
  { name: "Scanner", icon: <AiOutlineSearch /> },
  { name: "New Coins", icon: <AiOutlineClockCircle /> },
  { name: "Wallet Watch", icon: <FaEye /> },
  { name: "Tokenomics", icon: <AiOutlinePieChart /> },
  { name: "AI Insights", icon: <AiOutlineRobot /> },
  { name: "Chart Vision", icon: <FaChartLine /> },
  { name: "API Sources", icon: <FaNetworkWired /> }
];

export function Sidebar({ tab, setTab }) {
  return (
    <div className="flex flex-col w-56 bg-[#18181b] border-r border-[#222] min-h-screen">
      <div className="flex flex-col items-center py-6">
        <img src="/logo.png" alt="Singularity.AI Logo" className="w-14 h-14 rounded-full mb-2" />
        <span className="text-xl font-bold tracking-wider text-white">SINGULARITY.AI</span>
      </div>
      <div className="flex flex-col px-2 space-y-2">
        {tabs.map((t) => (
          <button
            key={t.name}
            onClick={() => setTab(t.name)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl text-base font-medium transition-all
              ${tab === t.name ? "bg-[#2563eb]/80 text-white" : "text-gray-300 hover:bg-[#222]/70"}`}
          >
            {t.icon}
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
