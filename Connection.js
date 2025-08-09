require('dotenv').config();  // load .env variables

const mongoose = require("mongoose");

async function connectToDb() {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aidb";
        await mongoose.connect(uri);
        console.log("Database connected!");
    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { connectToDb };
