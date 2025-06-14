import React from "react";
import { Sidebar } from "./components/Sidebar";
import { MainView } from "./components/MainView";

export default function App() {
  const [tab, setTab] = React.useState("Landing");
  return (
    <div className="flex bg-[#0a0a0a] min-h-screen text-white font-inter">
      <Sidebar tab={tab} setTab={setTab} />
      <MainView tab={tab} />
    </div>
  );
}
