const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');

const conf = require('./conf');
const User = require('./models/user/User');
const UserController = require('./models/user/UserController');


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
