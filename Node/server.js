const express = require('express');
const mysql = require('mysql2');
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

//GET Users
app.get('/Users', (req, res) => {
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



app.get('/Vehicle', (req, res) => {
    connection.query(
        'SELECT * FROM `vehicle`',
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

app.get('/Vehicle/:id', (req, res) => {
    let vehicle_id = req.params['id'];
    connection.query(
        'SELECT * FROM `vehicle` WHERE `id` = ' + vehicle_id,
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});
app.get('/Order/:user_id', (req, res) => {
    let user_id = req.params['user_id'];
    connection.query(
        'SELECT * FROM `order` WHERE `user_id` = ' + user_id,
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});
app.get('/Order', (req, res) => {
        connection.query(
        'SELECT * FROM `order`',
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});


app.get('/Order/:vehicle_id', (req, res) => {
    let vehicle_id = req.params['vehicle_id'];
    connection.query(
        'SELECT * FROM `order` WHERE `vehicle_id` = ' + vehicle_id,
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

app.get('/Order/:user_id/:address_id', (req, res) => {
    let user_id = req.params['user_id'];
    let address_id = req.params['address_id'];
    connection.query(
        'SELECT * FROM `order` WHERE `user_id` = ' + user_id + 'AND `address_id` = ' + address_id,
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});


//POST insertComment
app.post('/insertComment/:id', (req, res) => {
    console.log('insert triggered!');
    console.log(req.body);
    let user_id = req.params['id'];
    connection.query(
        'INSERT INTO `order` (comment) VALUES (?) WHERE `id` = ' + user_id,
        [req.body.comment],
        function(err, results){
            console.log(results);
            console.log(err);
        }
    );
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})