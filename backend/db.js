const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    user: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: 'todo_app'
})

const connectToMySQL = () => {
    db.connect(err => {
        if (err) {
            console.log('Database connection error :( => ' + err)
            return;
        }
        console.log('Connected successfully to MySQL :)')
    })
}

module.exports = connectToMySQL