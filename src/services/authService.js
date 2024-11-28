const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const { User } = require('../configs/dbConfig');
const { generateTokens, updateRefreshToken } = require('../utils');

const register = async (username, email, password) => {
  const existingUser = await User.findOne({
    where: {
      [Sequelize.Op.or]: [{ username }, { email }],
    },
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Username already taken');
    }
    if (existingUser.email === email) {
      throw new Error('Email already taken');
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

const login = async (username, password) => {
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const { accessToken, refreshToken } = generateTokens(
    user.id,
    user.username,
    user.email
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await user.update({ refresh_token: hashedRefreshToken });

  return { accessToken, refreshToken };
};

const logout = async (id) => {
  const user = await User.findByPk(id);

  if (!user.refresh_token) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  const result = await User.update({ refresh_token: null }, { where: { id } });

  return result;
};

module.exports = {
  register,
  login,
  logout,
};
