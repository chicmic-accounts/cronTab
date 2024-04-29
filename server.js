const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const userHistoryModel = require('./userHistoryModel');
require("dotenv").config();
const pool = require('./psql');
const  { openConnection, closeConnection}= require('./script');
const database = mongoose.createConnection(process.env.DB_URL);
console.log('Connected to database', database);

const app = express();
app.use(express.json());

async function addUserHistory()  {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() - process.env.DATA_FETCH_HOURS));
	const { rows } = await pool.query('SELECT DISTINCT ON (username, hostipv6, domain, "5mintime") * FROM data WHERE "5mintime" > $1::timestamp ORDER BY "5mintime" ASC', [ date ]);
	for (const doc of rows) {
		try {
		await userHistoryModel.create(doc);
 		} catch (error) {
				console.log('Error creating table:', error.message);
		}
	}
    console.log('Data inserted successfully!');
};
// addUserHistory();

cron.schedule(process.env.USER_WEB_HISTORY_CRON_TIME, async () => {
    console.log('Cron job to add history data ', new Date());
    await openConnection();
    await addUserHistory();
    await closeConnection();

});

mongoose.connect(process.env.DB_URL).then(
	app.listen(4020) 
).then(() => {
	console.log(`running at port ${4008}`);
}).catch((err) => {
	console.log(err);
}); 

