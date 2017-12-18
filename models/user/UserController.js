const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const User = require('./User');

// GET users

router.get('/', (req, res) => {
  User.find().then((users) => {
    res.status(200).send(users);
  }, (err) => {
    res.status(400).send("There was a problem with your request");
  });
});

// POST users

router.post('/', (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then((user) => {
    res.status(200).send({user});
  }, (err) => {
    res.status(400).send(`There was an error creating the user: "${err}"`);
  });
});


module.exports = router;
