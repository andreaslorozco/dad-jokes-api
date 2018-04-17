let mongoose = require('mongoose');

if (process.env.NODE_ENV === 'test') {
  // mongoose.connect(`mongodb://${process.env.DB_TEST}`, {useMongoClient: true});
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`, {useMongoClient: true});
} else {
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`, {useMongoClient: true});
}
