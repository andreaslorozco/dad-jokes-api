const JWT = require('jsonwebtoken');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const conf = require('./../conf');
const User = require('./../models/user/User');
const passportConf = require('./../passport');

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

    // TOKEN Stuff
    const token = signToken(user);

    // RESPONDE WITH TOKEN
    res.status(200).send({user, token});

  }, (err) => {
    res.status(400).send(`There was an error creating the user: "${err}"`);
  });
});

// SIGN IN ___

router.post('/signin', passport.authenticate('local', {session: false}), (req, res) => {
  // Generate TOKEN
  const token = signToken(req.user);
  res.status(200).json(token);

});

// GET secret route
router.get('/secret', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.status(200).send("It worked!");
})

// SIGN TOKEN FUNCTION

signToken = user => {
  const token = JWT.sign({
    iss: 'Dad Jokes API',
    sub: user._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1) //current time + 1 day ahead
  }, conf.jwt_secret);
  return token;
}


module.exports = router;
