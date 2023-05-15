const mysql = require('mysql');

const connection = ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projeto_geraldo'
});


module.exports = connection;