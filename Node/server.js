const express = require('express');
const mysql = require('mysql2');
const config = require('./config')
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const bcrypt = require('bcrypt');
const port = 3000;
const saltRounds = 10;

//Connection to database
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

//Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.get('/', (req, res) => {
    console.log(session.id);
    console.log('check to see if logged');
    if (req.session.useremail){
        console.log('triggered');
        console.log(req.session.useremail);
        res.redirect('logged');
    }
    res.sendFile(path.join(__dirname + '/html/info.html'));

});

//POST Register customer or Courier
app.post('/register', (req, res) => {
    console.log('register triggered!');
    console.log(req.body);

    connection.query(
        'SELECT `*` FROM `users` WHERE `email` = ?', [req.body.email],
        function(err, results, fields) {
            if(results.length){
                console.log("Already exists");
                console.log(results);
                res.send("Already exists");
            }
            else   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                connection.query(
                    'INSERT INTO `users` (email, password, status) VALUES (?, ?, ?)',
                    [req.body.email, password, req.body.status],
                    function (err, results) {
                        console.log(results);
                        console.log(err);
                        res.send("OK");
                    }
                );
            });
        }
    );

});

app.post('/checklogin', (req, res) => {
    console.log('login check triggered!');
    connection.query(
        'SELECT `id`, `username`,`email`, `hash`, `status` FROM `users` WHERE `email` = ?', [req.body.email],
        function (err, results, fields) {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, function (err, ress) {
                    if (ress) {
                        console.log("correct password");
                        req.session.userid = results[0].id;
                        req.session.username = results[0].username;
                        req.session.useremail = results[0].email;
                        req.session.status = results[0].status;

                        console.log(req.session.userid);
                        console.log(req.session.username);
                        console.log(req.session.useremail);
                        console.log(req.session.status);

                        let loginData = {
                            id: results[0].id,
                            username: results[0].username,
                            email: results[0].email,
                            status: results[0].status,
                        };

                        res.send(loginData);
                    } else {
                        console.log("Wrong password");
                        res.send("BadLogin");
                    }
                });
            }
        }
    );
});

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


//get vehicle
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

//get vehicle
app.get('/address', (req, res) => {
    connection.query(
        'SELECT * FROM `address`',
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

//get vehicle through an id
app.get('/GetvehicleById/:idd', (req, res) => {
    let vehicle_id = req.params.idd;
    connection.query(
        'SELECT * FROM `vehicle` WHERE `user_id` = ' + vehicle_id,
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

//get order through an id
app.get('/getOrderById/:idd', (req, res) => {
    const UrlId = req.params.idd;
    console.log(UrlId);
    connection.query(
        'SELECT * FROM `order` WHERE `user_id` = ?', [UrlId],
        function(err, results, fields) {
            if(results){
                console.log(results);
                res.send(results);
            }
        }
    );
});

//get order
app.get('/Order', (req, res) => {
    const idd = req.params.idd;
        connection.query(
        'SELECT * FROM `order` WHERE `user_id` = ?', [idd],
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
app.post('/insertComment', (req, res) => {
    console.log('insert triggered!');
    console.log(req.body);
    connection.query(
        'UPDATE `order` SET status = ? , comment = ? WHERE `id` = ?',
        [req.body.status, req.body.text, req.body.id],
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