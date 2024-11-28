const passport = require('passport');

const authenticateJwtToken = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 'failed', message: 'Internal server error' });
    }

    if (!user) {
      return res
        .status(401)
        .json({ status: 'failed', message: 'Unauthorized access' });
    }

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = authenticateJwtToken;
