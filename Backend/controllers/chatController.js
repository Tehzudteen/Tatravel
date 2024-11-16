const client = require("../config/openaiClient"); // Import the OpenAI client
const ChatMessage = require("../models/ChatMessage"); // Import the model

// Retry helper function
const retryRequest = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error; // Throw error if retries exhausted
    }
  }
};

// Controller function to handle chat responses
const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate the incoming request
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    // Retry request in case of transient failures
    const response = await retryRequest(() =>
      client.chat.completions.create({
        model: "typhoon-v1.5x-70b-instruct",
        messages: [{ role: "user", content: message }],
        max_tokens: 512,
        temperature: 0.6,
        top_p: 0.95,
        repetition_penalty: 1.05,
      })
    );

    // Save the chat message to MongoDB (non-blocking)
    ChatMessage.create({ user: "user", message }).catch(err =>
      console.error("Failed to save message to MongoDB:", err)
    );

    // Send response to the client
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in getChatResponse:", error);

    // Enhanced error response for debugging
    res.status(500).json({
      error: "An error occurred while processing your request.",
      details: error.message,
    });
  }
};

module.exports = { getChatResponse };
