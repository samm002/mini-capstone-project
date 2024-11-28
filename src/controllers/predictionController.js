const { predictionService, uploadImage } = require('../services');

const upload = async (req, res) => {
  try {
    const imageUrl = await uploadImage('profiles', req.file);

    res.status(200).json({
      status: 'success',
      message: 'upload image success',
      data: imageUrl,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'upload image failed',
      error: error.message,
    });
  }
};

const predictImage = async (req, res) => {
  try {
    const user_id = req.user.id;

    const imageUrl = await uploadImage('predictions', req.file);

    const predictionResult = await predictionService.predict(req.file);

    const { prediction, predictionDetail } =
      await predictionService.createPrediction(
        user_id,
        imageUrl,
        predictionResult
      );

    res.status(200).json({
      status: 'success',
      message: 'predict success',
      data: { prediction, predictionDetail },
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'predict failed',
      error: error.message,
    });
  }
};

const viewPredictionDetail = async (req, res) => {
  const prediction_id = req.params.id;

  try {
    const predictionDetail = await predictionService.getPredictionDetail(
      prediction_id
    );

    res.status(200).json({
      status: 'success',
      message: 'view prediction detail success',
      data: predictionDetail,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'view prediction detail failed',
      error: error.message,
    });
  }
};

module.exports = {
  upload,
  predictImage,
  viewPredictionDetail,
};
