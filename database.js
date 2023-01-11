var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bacon123!',
    database: 'dino_database'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log('Database is connected successfully!')
});
module.exports = connection;