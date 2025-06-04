const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.TYPHOON_API_KEY, // Set in .env
  baseURL: "https://api.opentyphoon.ai/v1", // Typhoon-compatible base URL
});

module.exports = client;
