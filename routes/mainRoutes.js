const express = require("express");
const { callGemini, handleGetChats, handleGetContactChats } = require("../controllers/main");
const router = express.Router();

router.get("/", handleGetChats);
router.post("/info", callGemini);
router.post("/contact", handleGetContactChats);

module.exports = router;