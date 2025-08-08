const { getUser } = require("../services/auth");

async function restrictToLogin(req, res, next) {
    try {
        const token = req.cookies?.uid;

        if (!token) {
            return res.status(401).redirect("/login");
        }
        const user = getUser(token);

        if (!user) {
            return res.status(401).redirect("/login");
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in restrictToLogin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { restrictToLogin };
