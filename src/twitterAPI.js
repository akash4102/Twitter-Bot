const TwitterApi = require("twitter-api-v2").default;
const config = require("./config");

const twitterClient = new TwitterApi({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
});

module.exports = twitterClient;
