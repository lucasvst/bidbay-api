var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./config/db');

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var api = {};

console.log(getDirectories(`${__dirname}/modules`))

api.opportunities = require('./modules/opportunities/routes');
app.use('/opportunities', api.opportunities);

/* Hello API */
app.get("/", function(req, resp) {
    resp.send("Hello stranger!");
});

module.exports = app;
