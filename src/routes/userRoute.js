const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { authenticateJwtToken, uploadHandler } = require('../middlewares');
const { editProfileValidation } = require('../utils');

router.get('/', authenticateJwtToken, userController.viewProfile);
router.patch(
  '/edit',
  uploadHandler,
  authenticateJwtToken,
  editProfileValidation,
  userController.editProfile
);
router.get(
  '/prediction-history',
  authenticateJwtToken,
  userController.viewPredictionHistory
);

module.exports = router;
