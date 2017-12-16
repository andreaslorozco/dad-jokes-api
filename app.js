let express = require('express');
let app = express();
let db = require('./db');
let JokeController = require('./joke/JokeController');
let bodyParser = require('body-parser');


app.use('/jokes', JokeController);
app.use(bodyParser.json());

module.exports = app;
