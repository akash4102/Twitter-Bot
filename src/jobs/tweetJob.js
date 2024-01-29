const axios = require('axios');
const cron = require('node-cron');
const config = require('../config');
const moment = require('moment-timezone');

const indiaTime = moment.tz('Asia/Kolkata');
const localTime = moment();
const differenceInMinutes = indiaTime.diff(localTime, 'minutes');

const scheduleHourForReply = 12;
const scheduleMinuteForReply = 0;
const scheduleHourForTrends = 14;
const scheduleMinuteForTrends = 0;

// Calculate the local time corresponding to 4 PM IST
const localScheduleHourForReply = (scheduleHourForReply + Math.floor(differenceInMinutes / 60)) % 24;
const localScheduleMinuteForReply = (scheduleMinuteForReply + differenceInMinutes % 60) % 60;

const localScheduleHourForTrends = (scheduleHourForTrends + Math.floor(differenceInMinutes / 60)) % 24;
const localScheduleMinuteForTrends = (scheduleMinuteForTrends + differenceInMinutes % 60) % 60;
// 0 0,6,12,18,22 * * * for 6 hour interval
// * * * * * for every minute
cron.schedule('0 0,6,12,18,22 * * *', function() {
    axios.get(config.TWEET_URL)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
});

cron.schedule(`${localScheduleMinuteForReply} ${localScheduleHourForReply} * * *`, function() {
    axios.get(config.TWEET_REPLY_URL)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
});

cron.schedule(`${localScheduleMinuteForTrends} ${localScheduleHourForTrends} * * *`, function() {
    console.log("working");
    axios.get(config.TWEET_TRENDS_URL)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
});