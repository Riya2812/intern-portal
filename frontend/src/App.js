// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [intern, setIntern] = useState(() => {
    const saved = localStorage.getItem("intern");
    return saved ? JSON.parse(saved) : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                onLoginSuccess={(data) => {
                  localStorage.setItem("intern", JSON.stringify(data));
                  setIntern(data);
                  toast.success(`Welcome, ${data.name}!`);
                }}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                intern={intern}
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
