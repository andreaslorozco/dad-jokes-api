const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
  title: String,
  text: String,
  keywords: [String]
});

const Joke = mongoose.model('Joke', JokeSchema);

module.exports = Joke;
