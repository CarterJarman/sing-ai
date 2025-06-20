// src/components/tabs/ChartVision.jsx

import React, { useRef, useState } from "react";
import { FaCloudUploadAlt, FaBolt, FaCheckCircle, FaRedo } from "react-icons/fa";

function simulateAIAnalysis() {
  const samples = [
    [
      "Uptrend detected in the past 7 days with higher lows and strong support at $1,425.",
      "Breakout above previous resistance confirmed by high volume.",
      "Support: $1,425, $1,380. Resistance: $1,560, $1,620.",
      "Cup & Handle pattern forming; if confirmed, target $1,720.",
      "No major bearish divergences detected.",
      "Risk: Macro news or BTC dump could trigger stop-loss sweep below $1,425.",
    ],
    [
      "Range-bound action: Price consolidating between $0.052 and $0.060.",
      "Support: $0.052. Resistance: $0.060.",
      "Declining volume; likely awaiting catalyst.",
      "Sentiment: Neutral. Volatility compression signals a sharp move soon.",
      "Tip: Watch for fakeouts. Use tight stops.",
    ],
    [
      "Downtrend: Lower highs and lower lows.",
      "Support at $3.40. Resistance at $3.85 and $4.00.",
      "Bearish engulfing candle detected at recent top.",
      "Sell volume increasing; possible distribution phase.",
      "Descending channel pattern. Reversal needs breakout plus volume.",
    ],
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

export default function ChartVision() {
  const [image, setImage] = useState(null);
  const [aiResults, setAIResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
    setAIResults(null);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
    setAIResults(null);
  }

  function startAI() {
    setLoading(true);
    setTimeout(() => {
      setAIResults(simulateAIAnalysis());
      setLoading(false);
    }, 2000 + Math.random() * 1000);
  }

  function reset() {
    setImage(null);
    setAIResults(null);
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="max-w-2xl mx-auto px-2 pt-8 pb-16">
      <div className="flex items-center gap-3 mb-8">
        <FaBolt className="text-[#2563eb] text-2xl" />
        <h2 className="text-2xl font-bold text-white">
          Chart Vision: AI Chart Analyzer
        </h2>
      </div>
      {!image && (
        <div
          className="bg-[#18181b] border-2 border-dashed border-[#2563eb] rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-[#222]/60 transition"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="text-[#2563eb] text-5xl mb-3" />
          <div className="text-xl font-bold text-white mb-1">
            Drag & Drop or Click to Upload Chart Image
          </div>
          <div className="text-gray-300 mb-4">PNG, JPG, or screenshot</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {image && (
        <div className="bg-[#18181b] rounded-2xl border border-[#232] p-5 flex flex-col items-center shadow">
          <img
            src={image}
            alt="Uploaded chart"
            className="rounded-xl mb-5 max-h-72 object-contain bg-black"
            style={{ border: "1px solid #222" }}
          />
          {!aiResults && !loading && (
            <button
              onClick={startAI}
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-3 flex items-center gap-2 text-lg shadow"
            >
              <FaBolt />
              Analyze Chart
            </button>
          )}
          {loading && (
            <div className="flex flex-col items-center gap-2 my-4">
              <span className="text-blue-300 font-bold text-lg animate-pulse">
                AI is thinking...
              </span>
              <span className="text-blue-200">Analyzing chart image</span>
            </div>
          )}
          {aiResults && (
            <div className="w-full">
              <div className="flex items-center gap-2 mt-5 mb-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-lg font-bold text-green-200">
                  AI Technical Analysis
                </span>
              </div>
              <ul className="text-gray-100 text-base space-y-2 mb-3">
                {aiResults.map((line, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="font-bold text-[#2563eb]">{i + 1}.</span> {line}
                  </li>
                ))}
              </ul>
              <button
                onClick={reset}
                className="flex items-center gap-2 mt-2 px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-900 font-semibold"
              >
                <FaRedo /> Clear & Upload New Chart
              </button>
              <div className="mt-4 text-center text-xs text-gray-400">
                Want real AI chart reading?{" "}
                <a
                  href="mailto:founder@yourproject.com"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact us to integrate AI Vision API
                </a>
                .
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}