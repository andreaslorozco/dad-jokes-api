let mongoose = require('mongoose');

let JokeSchema = new mongoose.Schema({
  title: String,
  text: String,
  keywords: [String]
});

mongoose.model('Joke', JokeSchema);

module.exports = mongoose.model('Joke');
