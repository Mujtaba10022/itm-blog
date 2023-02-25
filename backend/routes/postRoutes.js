const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();


router.post('/users/:userId/posts', postController.addPost);
router.delete('/users/:userId/posts/:postId', postController.deletePost);
router.patch('/users/:userId/posts/:postId', postController.updatePost);
router.get('/users/:userId/posts', postController.readPost);
router.get('/users/:userId/posts/:postId', postController.readByIdPost);

module.exports = router;