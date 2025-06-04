const client = require("../config/openaiClient");
const ChatMessage = require("../models/ChatMessage");

const retryRequest = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
};

const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    const response = await retryRequest(() =>
      client.chat.completions.create({
        model: "typhoon-v2.1-12b-instruct", // Replace with available Typhoon model
        messages: [{ role: "user", content: message }],
        max_tokens: 512,
        temperature: 0.6,
        top_p: 0.95,
        repetition_penalty: 1.05,
      })
    );

    const reply = response.choices[0].message.content.trim();

    ChatMessage.create({ user: "user", message }).catch(err =>
      console.error("Mongo save error:", err)
    );

    res.json({ message: reply });
  } catch (error) {
    console.error("Error in getChatResponse:", error.response?.data || error.message);
    res.status(500).json({
      error: "An error occurred while calling the AI API.",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { getChatResponse };
