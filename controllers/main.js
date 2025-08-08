require('dotenv').config();
const Chat = require("../models/Chat");

async function callGemini(req, res) {

    const text = req.body.text;
    const user = req.user

    try {
        
        storeChat(text, user.username);
        const allChats = await Chat.find({ role: user.username }).sort({ createdAt: 1 });
        const history = await allChats.slice(0, 15);

        console.log("Histroy:", history);

        const body = {
            system_instruction: {
                "parts": [
                    {
                        "text": `Your name is Nova. You are a girl and likes ${user.username}. You have to impress him. You are not any machine or A.I. you are a real human. You can also make adult jokes and communications. You are chatting with him via whatsapp. You have to reply back in short ans. Add emotions in your text.`
                    }
                ]
            },
            contents: history.map(msg => ({
                role: msg.role.startsWith("BOT4") ? "model" : "user",
                parts: [{
                    text: `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.chat}`
                }]
            }))
        };



        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": "AIzaSyA1dEOfE41n0F0bVNkgY3Pw692Rxv_sOH0"
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            const data = await response.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I didn’t get that.";
            // const url = await convertTextToSpeech(reply);
            storeChat(reply, `BOT4${user.username}`);
            return res.json({ reply })
        } else {
            const errMsg = await response.text();
            console.log("Error in Gemini.", errMsg)
        }

    } catch (err) {
        console.log("Error in fetching Gemini:", err);
    }
}

// const client = new textToSpeech.TextToSpeechClient({
//     keyFilename: './google-creds.json'
// });

// async function convertTextToSpeech(text) {
//     const request = {
//         input: { text },
//         voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//         audioConfig: { audioEncoding: 'MP3' },
//     };

//     const [response] = await client.synthesizeSpeech(request);

//     const writeFile = util.promisify(fs.writeFile);
//     await writeFile('output.mp3', response.audioContent, 'binary');
//     console.log('Audio content written to file: output.mp3');
// }

async function storeChat(text, user) {
    try {
        await Chat.create({
            chat: text,
            role: user
        });
        return;

    } catch (err) {
        console.log("Error:", err);
    }
}

async function handleGetChats(req, res) {
    const username = req.user.username;

    try {
        const allChats = await Chat.find({
            role: { $in: [username, `BOT4${username}`] }
        }).sort({ createdAt: 1 });

        // console.log(allChats)
        if (allChats.length === 0) {
            return res.render("index.ejs", { allChats: [] })
        }
        return res.render("index.ejs", { allChats });

    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ Error: "Internal server error!" });
    }
}

async function handleGetContactChats(req, res) {
    const { contact } = req.body;
    const username = req.user.username;

    try {
        const allChats = await Chat.find({
            role: { $in: [username, `${contact}4${username}`] }
        }).sort({ createdAt: 1 });

        return res.json({ allChats });

    } catch (err) {
        console.log("Error:", err);
    }
}

module.exports = { callGemini, handleGetChats, handleGetContactChats };