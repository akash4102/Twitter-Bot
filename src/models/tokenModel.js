const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  codeVerifier: String,
  state: String,
  accessToken: String,
  refreshToken: String,
});

module.exports = mongoose.model("Token", tokenSchema);
