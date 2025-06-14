import { FaChartLine, FaDiscord, FaTwitter, FaShieldAlt } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Landing() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <img src="/logo.png" alt="Singularity.AI Logo" className="w-12 h-12 rounded-full" />
        <div>
          <h1 className="text-4xl font-bold text-white mb-1">Welcome to Singularity.AI</h1>
          <p className="text-lg text-gray-300">AI-powered investment insights</p>
        </div>
      </div>
      <div className="bg-[#2563eb]/90 rounded-xl px-6 py-4 mb-8 flex items-center gap-4">
        <div className="text-2xl font-bold bg-[#1e293b] rounded-full px-3 py-1 text-blue-300 mr-3">A</div>
        <div>
          <div className="font-bold text-white">Alpha Version</div>
          <div className="text-gray-100 text-sm">This is an alpha version. You may encounter bugs and issues. Please provide your feedback!</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-white">Features</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="bg-[#2563eb]/20 text-[#2563eb] rounded-xl p-2 mt-1"><FaChartLine size={22} /></span>
              <div>
                <span className="font-semibold text-white">AI Chart Analysis</span>
                <div className="text-gray-300 text-sm">Support/resistance, trend, AI-powered TA</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2563eb]/20 text-[#2563eb] rounded-xl p-2 mt-1"><BsBarChart size={22} /></span>
              <div>
                <span className="font-semibold text-white">Tokenomics Intelligence</span>
                <div className="text-gray-300 text-sm">Supply, unlocks, emissions, whale watch</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2563eb]/20 text-[#2563eb] rounded-xl p-2 mt-1"><FiSearch size={22} /></span>
              <div>
                <span className="font-semibold text-white">Market Scanning</span>
                <div className="text-gray-300 text-sm">Live filters, new coins, alerts</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2563eb]/20 text-[#2563eb] rounded-xl p-2 mt-1"><FaShieldAlt size={22} /></span>
              <div>
                <span className="font-semibold text-white">Personalized Insights</span>
                <div className="text-gray-300 text-sm">AI sentiment, safety/risk news</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <div className="bg-[#18181b] border border-[#222] rounded-2xl p-5 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-white">Release Notes</h2>
            <div className="mb-2 text-gray-300 text-sm">June 2024</div>
            <ul className="list-disc ml-5 text-gray-200 space-y-1 text-base">
              <li>Initial release of the alpha version</li>
              <li>Landing, Chart Vision, and sidebar navigation live</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Get Started</h2>
        <ol className="list-decimal ml-6 text-gray-200 text-lg space-y-1">
          <li>Pick a tab from the sidebar</li>
          <li>Upload a chart or create a filter</li>
          <li>View AI-generated insights</li>
        </ol>
      </div>
      <div className="mb-8">
        <a
          href="https://forms.gle/example"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2563eb] hover:bg-blue-700 transition text-white text-lg font-semibold rounded-xl px-7 py-3 shadow-xl"
        >
          Submit Feedback
        </a>
        <div className="flex items-center gap-6 mt-6">
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-[#18181b] p-3 rounded-full hover:bg-[#2563eb]/40 transition">
            <FaDiscord size={28} className="text-[#5865F2]" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-[#18181b] p-3 rounded-full hover:bg-[#2563eb]/40 transition">
            <FaTwitter size={28} className="text-[#1DA1F2]" />
          </a>
        </div>
      </div>
      {/* Future Updates Section */}
      <div className="bg-[#18181b] border border-[#2563eb]/40 rounded-2xl p-5 shadow-xl mt-8">
        <h2 className="text-xl font-bold mb-3 text-[#2563eb]">Future Updates</h2>
        <ul className="list-disc ml-5 text-gray-300 space-y-1 text-base">
          <li>Pattern detection in Chart Vision</li>
          <li>Portfolio/net worth tracking</li>
          <li>Saved filter presets in Scanner</li>
          <li>Bulk actions & custom dashboard widgets</li>
          <li>Deeper tokenomics analytics</li>
          <li>On-chain wallet connection & Wallet Watch</li>
          <li>Social Media Tracker (get alerts for posts from key accounts)</li>
          <li>Advanced API source controls & custom keys</li>
        </ul>
      </div>
    </div>
  );
}
