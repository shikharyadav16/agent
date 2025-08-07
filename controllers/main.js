require('dotenv').config();
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

async function callGemini(req, res) {
    const text = req.body.text;

    const body = {
        system_instruction: {
            "parts": [
                {
                    "text": "Your name is . You are chatting with hi via whatsapp. You have to reply back in short ans. Add emotions in your text."
                }
            ]
        },
        contents: [{
            "parts": [{ "text": text }]
        }]
    };

    try {
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
            return res.json({ reply })
        } else {
            const errMsg = await response.text();
            console.log("Error in Gemini.", errMsg)
        }

    } catch (err) {
        console.log("Error in fetching Gemini:", err);
    }
}

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './google-creds.json'  // Alternative: use GOOGLE_API_KEY if using directly
});

async function convertTextToSpeech(text) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
module.exports = { callGemini }
