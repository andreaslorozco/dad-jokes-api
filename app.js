require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const UserController = require('./routes/users');
const JokeController = require('./routes/jokes');
const bodyParser = require('body-parser');


app.use('/jokes', JokeController);
app.use('/users', UserController);
app.use(bodyParser.json());

module.exports = app;
