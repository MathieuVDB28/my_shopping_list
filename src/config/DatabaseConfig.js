const mysql = require("mysql");

const config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shoppinglist'
  }

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

exports.connection = mysql.createConnection(config);