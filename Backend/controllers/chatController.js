const client = require("../config/openaiClient");  // Import the OpenAI client
const ChatMessage = require("../models/ChatMessage");  // Import the model

const getChatResponse = async (req, res) => {
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

    // Save the chat message to MongoDB
    await ChatMessage.create({ user: "user", message });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { getChatResponse };
