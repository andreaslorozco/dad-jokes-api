const express = require('express');
const app = express();
const db = require('./db');
const UserController = require('./models/user/UserController');
const JokeController = require('./models/joke/JokeController');
const bodyParser = require('body-parser');


app.use('/jokes', JokeController);
app.use('/users', UserController);
app.use(bodyParser.json());

module.exports = app;
