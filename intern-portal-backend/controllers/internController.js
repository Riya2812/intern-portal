const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/interns.json");

const getInterns = (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const interns = JSON.parse(data);
  res.json(interns);
};

const addIntern = (req, res) => {
  const { name, referralCode, amount } = req.body;

  if (!name || !referralCode || !amount) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  const interns = JSON.parse(data);

  const newIntern = { name, referralCode, amount };
  interns.push(newIntern);

  fs.writeFileSync(filePath, JSON.stringify(interns, null, 2), "utf-8");
  res.status(201).json(newIntern);
};

module.exports = { getInterns, addIntern };
