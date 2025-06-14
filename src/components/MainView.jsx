import React from "react";
import Landing from "./tabs/Landing";
import ChartVision from "./tabs/ChartVision";
import Dashboard from "./tabs/Dashboard";
import Scanner from "./tabs/Scanner";
import NewCoins from "./tabs/NewCoins";
import Tokenomics from "./tabs/Tokenomics";
import AIInsights from "./tabs/AIInsights";
import APISources from "./tabs/APISources";

export function MainView({ tab }) {
  return (
    <div className="flex-1 p-2 md:p-10 bg-[#0a0a0a] min-h-screen">
      {tab === "Landing" && <Landing />}
      {tab === "Chart Vision" && <ChartVision />}
      {tab === "Dashboard" && <Dashboard />}
      {tab === "Scanner" && <Scanner />}
      {tab === "New Coins" && <NewCoins />}
      {tab === "Tokenomics" && <Tokenomics />}
      {tab === "AI Insights" && <AIInsights />}
      {tab === "API Sources" && <APISources />}
    </div>
  );
}
