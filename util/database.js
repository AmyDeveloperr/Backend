const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'backend_project',
    password: 'Simba12$'
});

module.exports = pool.promise();