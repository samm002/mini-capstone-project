const express = require('express');
const router = express.Router();

const { predictionController } = require('../controllers');
const { uploadHandler, authenticateJwtToken } = require('../middlewares');

router.post('/upload', uploadHandler, predictionController.upload);
router.post(
  '/',
  uploadHandler,
  authenticateJwtToken,
  predictionController.predictImage
);
router.get(
  '/:id',
  authenticateJwtToken,
  predictionController.viewPredictionDetail
);

module.exports = router;
