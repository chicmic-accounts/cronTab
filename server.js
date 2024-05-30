const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
require("dotenv").config();
const  { openConnection,addUserHistory, closeConnection}= require('./script');

const app = express();
app.use(express.json());


cron.schedule(process.env.USER_WEB_HISTORY_CRON_TIME, async () => {
    console.log('Cron job to add history data ', new Date());
    await openConnection();
	await addUserHistory();
    await closeConnection();

});

mongoose.connect(process.env.DB_URL).then(
).then(() => {
	console.log(`running at port ${4008}`);
}).catch((err) => {
	console.log(err);
}); 

