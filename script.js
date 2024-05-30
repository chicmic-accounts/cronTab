console.log('Connected to database');
const shell = require('shelljs')
const userHistoryModel = require('./userHistoryModel');

async function openConnection()  {
    shell.exec('./portForwardingStart.sh', { async: true });
    console.log('connection open script ');
}

async function addUserHistory()  {
    const { Pool } = require('pg');
    // Database connection information
        const pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE_NAME,
        });
    
    
            let date = new Date();
            date = new Date(date.setHours(date.getHours() - process.env.DATA_FETCH_HOURS));
    
            try {
                const tables = ['webv8_5min_00', 'webv8_5min_01', 'webv8_5min_02', 'webv8_5min_03', 'webv8_5min_04', 'webv8_5min_05'];
                
                for (const table of tables) {
                  const { rows } = await pool.query(`SELECT DISTINCT ON (username, hostipv6, domain, "5mintime") * FROM ${table} WHERE "5mintime" > $1 ::timestamp ORDER BY "5mintime" DESC`, [ date ]);
              
                  await Promise.all(rows.map(doc => userHistoryModel.create(doc).catch(error => console.log('Error creating table:', error.message))));
                }
              } catch (error) {
                console.log('Error:', error.message);
              }
            console.log('Data inserted successfully!');
            await pool.end();
}

async function closeConnection()  {
    shell.exec('./portForwardingStop.sh', { async: true });
    console.log('connection close script');
}
module.exports = {openConnection, closeConnection, addUserHistory};