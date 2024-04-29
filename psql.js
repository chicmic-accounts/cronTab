const { Pool } = require('pg');
const fs= require('fs');
// Database connection information
const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE_NAME,
});

module.exports = pool;
