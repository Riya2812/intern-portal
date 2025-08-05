const express = require("express");
const { getInterns, addIntern } = require("../controllers/internController");

const router = express.Router();

router.get("/", getInterns);
router.post("/", addIntern);

module.exports = router;
