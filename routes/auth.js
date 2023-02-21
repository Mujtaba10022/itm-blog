const express = require('express');
const isEmailExists = require('../util/validations');
const authController = require('../controllers/auth');
const postController = require('../controllers/posts');
const { check, validationResult, body } = require('express-validator');

const router = express.Router();

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
authController.login);

router.post('/signup', authController.signup);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);


// Add a post 
router.post('/users/:userId/posts', postController.addPost);

// Delete a post by a user with a particular post id
router.delete('/users/:userId/posts/:postId', postController.deletePost);

router.patch('/users/:userId/posts/:postId', postController.updatePost);
router.get('/users/:userId/posts', postController.readPost);
router.get('/users/:userId/posts/:postId', postController.readByIdPost);

module.exports = router;
