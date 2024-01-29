const express = require('express');
const tweetController = require('../controllers/tweetController');

const router = express.Router();

router.get('/tweet', tweetController.tweet);
router.post('/generate/tweet', tweetController.generateTweet);

module.exports = router;
