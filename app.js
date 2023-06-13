const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "demoDB"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', function(req, res){
    let username = req.body.username;
    let password = req.body.password;

    //Query: [test' OR '1'='1]

    // con.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (err, result) {
    //     if (err) throw err;
    //     if(result.length > 0){
    //         res.send('Logged in successfully');
    //     } else {
    //         res.send('Incorrect username or password');
    //     }
    // });

    //To prevent SQL injection
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    con.query(sql, [username, password], function(error, results){
        if (error) {
            console.log('Error occurred: ' + error);
            res.send('An error occurred. Please try again.');
        } else if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Username or password is incorrect.');
        }
    });
});

app.listen(3001, function () {
    console.log('App listening on port 3001! This applicatiopn is protected from SQL Injection!');
});
