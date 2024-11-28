const { userService, predictionService, uploadImage } = require('../services');

const viewProfile = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await userService.viewProfile(id);

    res.status(200).json({
      status: 'success',
      message: 'view profile success',
      data: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'view profile failed',
      error: error.message,
    });
  }
};

const editProfile = async (req, res) => {
  const id = req.user.id;
  let imageUrl = null;

  try {
    if (req.file) {
      imageUrl = await uploadImage('profiles', req.file);
    }

    const user = await userService.editProfile(id, req.body, imageUrl);

    res.status(200).json({
      status: 'success',
      message: 'edit profile success',
      data: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'edit profile failed',
      error: error.message,
    });
  }
};

const viewPredictionHistory = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await predictionService.getPredictionsByUserId(id);

    res.status(200).json({
      status: 'success',
      message: 'view user prediction history success',
      data: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'view user prediction history failed',
      error: error.message,
    });
  }
};

module.exports = {
  viewProfile,
  editProfile,
  viewPredictionHistory,
};
