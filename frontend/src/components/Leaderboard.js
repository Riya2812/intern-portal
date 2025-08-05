import React from "react";
import { FaTrophy } from "react-icons/fa";

function Leaderboard({ intern }) {
const leaderboard = [
  { name: "Xyz Abd", referralCode: "xyz2025", amount: "₹5,000" },
  { name: "Pqr Asd", referralCode: "pqr2025", amount: "₹4,300" },
  { name: "Lmn Efg", referralCode: "lmn2025", amount: "₹3,900" },
  { name: "Def Hij", referralCode: "def2025", amount: "₹3,600" },
];


  // Add current intern to leaderboard only if not already present
  if (
    intern?.name &&
    !leaderboard.some((e) => e.referralCode === intern.referralCode)
  ) {
    leaderboard.push({
      name: intern.name,
      referralCode: intern.referralCode,
      amount: intern.amount,
    });
  }

  const sortedData = [...leaderboard]
    .filter((e) => e.amount)
    .sort(
      (a, b) =>
        parseInt(b.amount.replace(/[₹,]/g, "")) -
        parseInt(a.amount.replace(/[₹,]/g, ""))
    );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transition">
      <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-300 flex items-center">
        <FaTrophy className="mr-2 text-yellow-500" /> Leaderboard
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Intern Name</th>
              <th className="py-2 px-4">Referral Code</th>
              <th className="py-2 px-4">Amount Raised</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => {
              const isCurrentUser =
                entry.referralCode === intern?.referralCode;
              const medal =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : "";

              return (
                <tr
                  key={entry.name + entry.referralCode}
                  className={`border-b border-gray-200 dark:border-gray-700 transition ${
                    isCurrentUser
                      ? "bg-green-100 dark:bg-green-700/30 font-semibold"
                      : "hover:bg-green-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <td className="py-2 px-4 font-bold">{medal || index + 1}</td>
                  <td className="py-2 px-4">{entry.name}</td>
                  <td className="py-2 px-4">{entry.referralCode}</td>
                  <td className="py-2 px-4 font-bold text-green-700 dark:text-green-300">
                    {entry.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
