const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const PORT = 5000;

app.get("/api/leaderboard", (req, res) => {
  const filePath = path.join(__dirname, "interns.json");

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);
    res.json(data);
  } catch (err) {
    console.error("Error reading leaderboard:", err);
    res.status(500).json({ message: "Failed to load leaderboard data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
