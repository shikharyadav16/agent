const User = require("../models/User");

async function handlePostLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username, password});

        if (!user) {
            return res.status(404).json({msg: "User not found!"});
        }
        return res.json({redirected: "/"});

    } catch (err) {
        console.log("Error:", err);
    }
}

async function handlePostSignup(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});

        if (user) {
            return res.json({msg: "User already exists!"})
        }

        await User.create({
            username: username,
            password: password
        });

        return res.status(404).json({redirected: "/"});

    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { handlePostLogin, handlePostSignup }