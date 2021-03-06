const JWT = require('jsonwebtoken');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const cors = require('cors');

app.use(cors);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const { JWT_SECRET } = process.env;
const User = require('./../models/User');
const passportConf = require('./../passport');

// GET users

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find().then((users) => {
    res.status(200).send(users);
  }, (err) => {
    res.status(400).send("There was a problem with your request");
  });
});

// POST users

router.post('/', validateBody(schemas.authSchema), (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then((user) => {

    // TOKEN Stuff
    const token = signToken(user);

    // RESPOND WITH TOKEN
    res.status(200).send({user, token});

  }, (err) => {
    res.status(400).send(`There was an error creating the user: "${err}"`);
  });
});

// SIGN IN

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
  }, JWT_SECRET);
  return { token };
}


module.exports = router;
