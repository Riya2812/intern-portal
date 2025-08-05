import React, { useEffect } from "react";
import {
  FaUser,
  FaGift,
  FaRupeeSign,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";
import Leaderboard from "./Leaderboard";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DashboardPage({ intern, toggleTheme, darkMode }) {
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!intern) {
      navigate("/");
    }
  }, [intern, navigate]);

  const { name, referralCode, amount } = intern || {};

  // Load leaderboard from localStorage
  const leaderboard = JSON.parse(localStorage.getItem("interns") || "[]");
  const sorted = [...leaderboard].sort(
    (a, b) => parseInt(b.amount.replace(/[₹,]/g, "")) - parseInt(a.amount.replace(/[₹,]/g, ""))
  );
  const rank = sorted.findIndex((e) => e.referralCode === referralCode) + 1;

  return (
    <div className="relative p-6 min-h-screen bg-green-50 dark:bg-gray-900 transition text-gray-800 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">
          Welcome, {name}
        </h1>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark Mode"
            className="p-2 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 shadow hover:scale-105 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              toast.success("Logged out successfully.");
              localStorage.removeItem("intern");
              setTimeout(() => navigate("/"), 500);
            }}
            title="Logout"
            className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow hover:scale-105 transition"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Stats + Fundraising Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FaUser />} label="Intern Name" value={name} />
        <StatCard icon={<FaGift />} label="Referral Code" value={referralCode} />
        <StatCard icon={<FaRupeeSign />} label="Donations Raised" value={amount} />

        {/* Summary Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition col-span-1">
          <h2 className="text-md font-bold text-gray-500 dark:text-gray-400 mb-2">
            Your Fundraising Summary
          </h2>
          <div className="text-sm space-y-2">
            <div>
              <span className="font-semibold text-green-700 dark:text-green-300">🏅 Rank: </span>
              {rank || "N/A"}
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-300">💰 Raised: </span>
              {amount}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard intern={intern} leaderboard={leaderboard} />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex items-center space-x-4 hover:shadow-lg transform hover:scale-[1.02] transition">
      <div className="text-green-700 dark:text-green-300 text-2xl">{icon}</div>
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </h2>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

export default DashboardPage;
