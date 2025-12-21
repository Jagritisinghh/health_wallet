const express = require("express");
const router = express.Router();
const vitalsController = require("../controllers/vitalController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/add", authenticateToken, vitalsController.addVital);

 
router.get("/", authenticateToken, vitalsController.getUserVitals);

module.exports = router;