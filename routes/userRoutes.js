const express = require("express");
const { handlePostLogin, handlePostSignup } = require('../controllers/user');
const router = express.Router();

router.route("/login")
    .get((req, res)=> {
        return res.render("login.ejs")
    })
    .post(handlePostLogin);

router.route("/signup")
    .get((req, res)=> {
        return res.render("signup.ejs");
    })
    .post(handlePostSignup);

module.exports = router;