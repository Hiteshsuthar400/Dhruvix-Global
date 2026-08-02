// Sample MySQL connector using mysql2
// Reads MYSQL_* variables from environment

const mysql = require('mysql2/promise');

async function connect(){
  const conn = await mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'dhruvix',
    waitForConnections: true,
    connectionLimit: 10,
  });
  console.log('MySQL pool created');
  return conn;
}

module.exports = {connect};
