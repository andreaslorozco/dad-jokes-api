let mongoose = require('mongoose');


if (NODE_ENV === "production") {
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`);
} else {
  let conf = require('./conf.js');
  mongoose.connect(`mongodb://${conf.user}:${conf.password}@${conf.uri}`);
};
