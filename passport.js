const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt} = require('passport-jwt');

const conf = require('./conf');
const User = require('./models/user/User');
const UserController = require('./routes/users');


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: conf.jwt_secret
}, (payload, done) => {
  try {
    // Find specified user in token
    const user = User.findById(payload.sub);

    // If user doesn't exist, handle it
    if (!user) {
      return done(null, false);
    }

    //  Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const userL = await User.findOne({email});

    // Handle if there's no user
    if (!userL) {
      return done(null, false);
    }

    // Determine if password sent matches password stored
    const isMatch = await userL.isValidPassword(password);

    //Handle if password doesn't match
    if (!isMatch) {
      return done(null, false);
    }

    // Handle password that matches
    done(null, userL);

  } catch (e) {
    done(e, false);
  };
}));
