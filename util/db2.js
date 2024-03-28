const mysql = require('mysql')

let config = require('./config')['production']

const connection = mysql.createConnection({
    host: config.Host,
    user: config.User2,
    password: config.Password,
    database: config.Database2
})

connection.connect((err) => {
    if (!err) { console.log('Successful connection to MYSQL database.') }
    else console.log('Main Database connection fail')
})

module.exports = connection