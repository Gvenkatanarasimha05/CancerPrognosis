const express = require("express");
const router = express.Router();
const { predictRisk } = require("../controllers/predictionController");

const { protect } = require("../middleware/auth");

router.post("/predict", protect, predictRisk);


module.exports = router;
