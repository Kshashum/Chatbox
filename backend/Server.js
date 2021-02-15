const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const port = 5000;

var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "******",
    database: "****"
});

db.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.route("/api/v1/user").get((req, res) => {
    const query = req.query;
    const sql = "select * from Users where email=?"
    db.query(sql, [query.email], (err, result) => {
        result = JSON.parse(JSON.stringify(result))
        if (result.length == 0) {
            res.json({ login: "False" }).status(404)
        }
        else if (result[0].password == query.password) {
            res.json({ login: "True", userName: result[0].userName }).status(200)
        }
        else {
            res.json({ login: "False" }).status(404)
        }
    })
})
    .post((req, res) => {
        let { username, name, email, password } = req.body.data;
        const sql = 'insert into users values (?,?,?,?)'
        db.query(sql, [username, name, email, password], (err, result) => {
            if (err) {
                console.log(err)
                res.json({ registered: "False", error: err.code }).status(500)
            }
            else {
                res.json({ registered: "True" }).status(200)
            }
        })
    })
app.route("/api/v1/msg").get((req, res) => {
    const sql = "select * from msg limit 20"
    db.query(sql, (err, result) => {
        result = JSON.parse(JSON.stringify(result))
        if (err) {
            console.log(err)
            res.json({ mesReceived: "False", error: err.code }).status(500)
        }
        else {
            res.json({ result, mesReceived: "True" }).status(200)
        }

    })
})
    .post((req, res) => {
        let { Content, userName } = req.body.data
        const sql = "insert into msg (Content, dt, userName) values (?,now(),?)"
        db.query(sql, [Content, userName], (err, result) => {
            if (err) {
                console.log(err)
                res.json({ mesPosted: "False", error: err.code }).status(400)
            }
            else {
                res.json({ mesPosted: "True" }).status(200)
            }
        })
    })
app.route("/api/v1/search").get((req, res) => {
    res.send("hello")
})
app.get("/", (req, res) => res.send("Hello World!"));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
