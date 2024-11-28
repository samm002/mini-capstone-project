const { authService } = require('../services');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await authService.register(username, email, password);

    res.status(201).json({
      status: 'success',
      message: 'user register success',
      data: newUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'user register failed',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);

    res.status(200).json({
      status: 'success',
      message: 'user login success',
      data: token,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'user login failed',
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const result = await authService.logout(req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'user logout success',
      data: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'user logout failed',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
