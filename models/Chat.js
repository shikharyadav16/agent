const mongoose = require("mongoose");

const chatSchema =  mongoose.Schema({
    chat: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;