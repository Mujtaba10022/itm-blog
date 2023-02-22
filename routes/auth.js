const express = require('express');
const isEmailExists = require('../util/validations');
const authController = require('../controllers/auth');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
authController.login);

router.post('/signup', authController.signup);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.patch('/users/:userId/posts/:postId', postController.updatePost);
router.get('/users/:userId/posts', postController.readPost);
router.get('/users/:userId/posts/:postId', postController.readByIdPost);

module.exports = router;
