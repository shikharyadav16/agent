const express = require("express");
const { callGemini } = require("../controllers/main");
const router = express.Router();

router.get("/", (req, res)=> {
    res.render("index.ejs");
});

router.post("/info", callGemini);

module.exports = router;