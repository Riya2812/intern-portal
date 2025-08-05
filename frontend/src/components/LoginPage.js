// src/components/LoginPage.js
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.firstName?.value || "";
    const lastName = form.lastName?.value || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const email = form.email?.value;
    const phone = form.phone?.value;
    const password = form.password?.value;
    const confirmPassword = form.confirmPassword?.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (isRegister && !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passRegex.test(password)) {
        alert("Password must have at least 8 characters including 1 uppercase, 1 lowercase, and 1 number.");
        return;
      }
    }

    const referralCode = fullName.toLowerCase().replace(/\s+/g, "") + "2025";
    const internData = {
      name: fullName || "Riya Rane",
      referralCode,
      amount: "₹5,000",
    };

    if (isRegister) {
      const existing = JSON.parse(localStorage.getItem("interns") || "[]");
      existing.push(internData);
      localStorage.setItem("interns", JSON.stringify(existing));
    }

    localStorage.setItem("intern", JSON.stringify(internData));
    onLoginSuccess(internData);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-white transition">
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Toggle Buttons */}
        <div className="flex justify-around mb-6">
          <button
            className={`font-semibold text-lg ${!isRegister ? "text-green-700 border-b-2 border-green-700" : "text-gray-400"}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`font-semibold text-lg ${isRegister ? "text-green-700 border-b-2 border-green-700" : "text-gray-400"}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">
          <FaUser className="inline mr-2" />
          {isRegister ? "Register New Intern" : "Intern Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Your First Name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Your Last Name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block mb-1 text-sm">Mobile Number</label>
                <div className="flex gap-2">
                  <select className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                By registering, you agree to our{" "}
                <span className="text-blue-500 underline">Terms of Use</span>,{" "}
                <span className="text-blue-500 underline">Privacy Policy</span>, and{" "}
                <span className="text-blue-500 underline">Data Collection</span>.
              </p>
            </>
          )}

          {!isRegister && (
            <>
              {/* Email for Login */}
              <div className="mb-4">
                <label className="block mb-1 text-sm">Email</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full outline-none bg-transparent text-gray-900 dark:text-white"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block mb-1 text-sm">Password</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
                  <FaLock className="mr-2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full outline-none bg-transparent text-gray-900 dark:text-white"
                    placeholder="Password"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
