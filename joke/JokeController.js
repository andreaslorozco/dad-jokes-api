let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

let Joke = require('./Joke');

router.post('/', (req, res) => {
  console.log('will try to connect');
  Joke.create({
    title: req.body.title,
    text: req.body.text,
    keywords: req.body.keywords
  }, (err, joke) => {
    if (err) {
      return res.status(500).send('There was an error adding info to the DB');
    } else {
      res.status(200).send(joke);
    };
  });
});

router.get('/', (req, res) => {
  Joke.find({}, (err, jokes) => {
    if (err) {
      return res.status(500).send("There was a problem retrieving info from the DB");
    } else {
      res.status(200).send(jokes);
    };
  });
});

module.exports = router;
