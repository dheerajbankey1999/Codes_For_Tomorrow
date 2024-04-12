const express = require('express');
const router = express.Router();
import { AuthController } from '../controller/authcontroller';

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/reset_password', AuthController.resetPassword);

module.exports = router;
