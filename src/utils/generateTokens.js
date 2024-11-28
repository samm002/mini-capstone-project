const jwt = require('jsonwebtoken');

const generateTokens = (id, username, email) => {
  const payload = { id, username, email };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
