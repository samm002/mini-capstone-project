const express = require('express');

const { authController } = require('../controllers');
const { authenticateJwtToken } = require('../middlewares');
const { loginValidation, registerValidation } = require('../utils');

const router = express.Router();

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/logout', authenticateJwtToken, authController.logout);

module.exports = router;
