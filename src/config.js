require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  CALLBACK_URL: process.env.CALLBACK_URL,
  TWEET_URL: process.env.TWEET_URL,
  PORT: process.env.PORT,
  ACCESS_TOKEN:process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
  API_KEY:process.env.API_KEY,
  API_KEY_SECRET:process.env.API_KEY_SECRET,
  TWEET_REPLY_URL:process.env.TWEET_REPLY_URL,
  TWEET_TRENDS_URL:process.env.TWEET_TRENDS_URL,
};
