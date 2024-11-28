const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('./dbConfig');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    'jwt',
    new JwtStrategy(options, async (payload, done) => {
      const user = await User.findOne({
        where: { username: payload.username },
      });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
