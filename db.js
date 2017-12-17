let mongoose = require('mongoose');
let conf = require('./conf.js');

mongoose.connect(`mongodb://${conf.user}:${conf.password}@${conf.uri}`);
