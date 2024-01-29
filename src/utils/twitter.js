const axios = require("axios");
const config = require("../config");

async function getRandomTrend(trends) {
  const randomIndex = Math.floor(Math.random() * trends.length);
  return trends[randomIndex];
}

async function createTweet(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a assistant who provide tweets"
        },
        {
          role: "user",
          content: `write a tweet on ${prompt} and add "#AESTRA Auto-generated tweet by Aestra-bot" in the end of tweet. and length of tweet should be 150`
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.OPEN_AI_API_KEY
      }
    }
  );
  return response.data.choices[0].message.content;
}

module.exports = {
  getRandomTrend,
  createTweet
}
