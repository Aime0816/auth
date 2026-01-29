const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',
    user: 'root',
    password: 'nsengiyumva.@16',
    database: 'backend_node',
    port: 3500
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
    console.log('Connected to the MySQL database.');
});
module.exports = connection;  