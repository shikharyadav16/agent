const jwt = require("jsonwebtoken");

const secureKey = "A7f9L2qX8rW3";

function setUser(user) {
    const payload = {
        username: user.username,
        gender: user.gender,
        hobbies: user.hobbies
    }

    return jwt.sign(payload, secureKey);
}

function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        const user = jwt.verify(token, secureKey);
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };
