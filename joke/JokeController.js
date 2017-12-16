let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));



let Joke = require('./Joke');

router.post('/', (req, res) => {

  Joke.create({

    title: req.body.title,
    text: req.body.text,
    keywords: req.body.keywords
  }, (err, joke) => {
    console.log(req.body);
    if (err) {
      return res.status(500).send('There was an error adding info to the DB');
    } else {
      // console.log(req.body);
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
