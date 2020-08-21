const express = require('express');
const mysql = require('mysql2')
const config = require('./config');
const app = express();
const path = require('path');
const port = 3000;

//Connection to database
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/info.html'))
})

//GET getUsers
app.get('/getUsers', (req, res) => {
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})