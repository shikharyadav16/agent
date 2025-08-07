const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/aidb");
        console.log("Database connected!");
    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { connectToDb };