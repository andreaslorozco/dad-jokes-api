let express = require('express');
let app = express();
let db = require('./db');

let JokeController = require('./joke/JokeController');
app.use('/jokes', JokeController);

module.exports = app;
