const mysql = require('mysql2/promise')
require('dotenv').config()

const db = mysql.createPool({
    host: 'localhost',
    user: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: 'todo_app',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
})

module.exports = db