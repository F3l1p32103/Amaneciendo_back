const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'rctecadmin',
    password: 'DQf!B859J5ef6ef',
    database: 'db_amaneciendo'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;