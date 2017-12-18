const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const Joke = require('./Joke');

// GET /jokes route

router.get('/', (req, res) => {
  Joke.find({}, (err, jokes) => {
    if (err) {
      return res.status(500).send("There was a problem retrieving info from the DB");
    } else {
      res.status(200).send(jokes);
    };
  });
});

// POST /jokes route

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

// GET /jokes single jokes

router.get('/:id', (req, res) => {
    Joke.findById(req.params.id, (err, joke) => {
      if (err) {
        return res.status(500).send("There was a problem finding the joke");
      } else if (!joke) {
        return res.status(404).send("No joke found");
      } else {
        res.status(200).send(joke);
      };
    });
});

// DELETE A JOKE FROM THE DATABASE

router.delete('/:id', (req, res) => {
  Joke.findByIdAndRemove(req.params.id, (err, joke) => {
    if (err) {
      return res.status(500).send("There was a problem deleting the user");
    } else if (!joke) {
      return res.status(404).send("No joke found.");
    } else {
      res.status(200).send(`Joke with title '${joke.title}' was deleted from the database.`);
    };
  });
});

// UPDATE A JOKE FROM DATABASE

router.put('/:id', (req, res) => {
  Joke.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, joke) => {
      if (err) {
        return res.status(500).send("There was a problem updating the user.")
      } else {
        res.status(200).send(joke);
      }
  });
});

module.exports = router;
