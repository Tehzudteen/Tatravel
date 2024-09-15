const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OpenAI } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

/* call gemini
// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Initialize the model (using gemini-pro)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(message);
    const response = await result.response;
    const aiMessage = response.text();

    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('PERMISSION_DENIED')) {
      res.status(403).json({ error: 'Access denied. Please check your API key and permissions.' });
    } else if (error.message.includes('RESOURCE_EXHAUSTED')) {
      res.status(429).json({ error: 'Resource quota exceeded. Please try again later.' });
    } else {
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
});
*/

//call Typhoon API
// Initialize OpenAI client with Typhoon API configuration
const client = new OpenAI({
  apiKey: process.env.TYPHOON_API_KEY,
  baseURL: "https://api.opentyphoon.ai/v1",
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "typhoon-v1.5x-70b-instruct",
      messages: [{ role: "user", content: message }],
      max_tokens: 512,
      temperature: 0.6,
      top_p: 0.95,
      repetition_penalty: 1.05,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
