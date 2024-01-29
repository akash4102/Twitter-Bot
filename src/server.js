const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
require('./jobs/tweetJob'); 

mongoose.connect(
  config.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authRoutes);
app.use(tweetRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
