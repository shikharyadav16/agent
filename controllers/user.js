const User = require("../models/User");
const { setUser } = require("../services/auth");

async function handlePostLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(404).json({ msg: "Invalid credentials!" });
        }
        const token = setUser(user);
        res.cookie("uid", token);

        return res.json({ redirected: "/" });

    } catch (err) {
        console.log("Error:", err);
    }
}

async function handlePostSignup(req, res) {
    const { username, password, gender, hobbies } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            return res.json({ msg: "User already exists!" })
        }

        const newUser = await User.create({
            username: username,
            password: password,
            gender: gender,
            hobbies: hobbies
        });

        const token = setUser(newUser);
        res.cookie("uid", token);

        return res.status(201).json({ redirectedTo: "/" });

    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { handlePostLogin, handlePostSignup }