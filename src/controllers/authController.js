const Token = require('../models/tokenModel');
const twitterClient = require('../twitterAPI');
const config = require('../config');

async function auth(req, res) {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    config.CALLBACK_URL,
    { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
  );

  const token = new Token({ codeVerifier, state });
  await token.save();
  res.redirect(url);
}

async function callback(req, res) {
  const { state, code } = req.query;

  const token = await Token.findOne({ state });
  if (state !== token.state) {
    return res.status(400).send("Stored tokens do not match!");
  }

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier: token.codeVerifier,
    redirectUri: config.CALLBACK_URL,
  });

  token.accessToken = accessToken;
  token.refreshToken = refreshToken;
  await token.save();

  const { data } = await loggedClient.v2.me();
  res.send(data);
}

module.exports = {
  auth,
  callback
}
