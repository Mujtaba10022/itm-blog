const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.post('/user/:userId/:postId/comment', commentController.create);

router.post('/user/:userId/:postId/comment/:commentId/delete', commentController.deleteComment);

router.post('/user/:userId/:postId/comment/:commentId/update', commentController.updateComment);

router.get('/user/:userId/:postId/comment/show', commentController.showComments);

module.exports = router;