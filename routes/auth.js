const express = require('express');
const isEmailExists = require('../util/validations');
const authController = require('../controllers/auth');
const apiController = require('../controllers/user');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 5 }), authController.login);

router.post('/signup', authController.signup);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// TODO SEPERATE IN FILE
router.get('/users', apiController.find);
router.get('/users/:id', apiController.find);
router.put('/users/:id', apiController.update);
router.delete('/users/:id', apiController.delete);




module.exports = router;