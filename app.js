var express = require('express');
var app = express();
var fs = require('fs');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
module.exports = app;

var publicPath = path.join(__dirname, './public');

app.use(morgan('dev'));
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('public/wolfram-style.html' , { root : __dirname });
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});
