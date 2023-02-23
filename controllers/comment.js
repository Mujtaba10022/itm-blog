const Posts = require("../models/Post");
const Comment = require("../models/Comments");


module.exports = {
  create: async function (req, res) {
    // find out which post you are commenting
    const postId = req.params.postId;
    // get the comment text and record post id
    Posts.findById(postId, async function (err, blogPost) {
      console.log(blogPost);
      
      if (err) {
        return res.status(400).json({
          success: false,
          
          });

        }      
        else {
        const comment = new Comment({
          text: req.body.comment,
          post: postId,
        });
        // save comment
        await comment.save();
      }
    });
  },

  deleteComment: function (req, res) {
    const commentId = req.body.commentId;
    Comment.findByIdAndDelete(commentId, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        return res.status(202).json({
          success: true,
          message: "comment deleted",
        });
      }
    });
  },


  updateComment: async function (req, res) {
    const commentId = req.body.commentId;
    const newComment = req.body.comment;

    let checkPost = await Comment.find({commentId}).populate('post_id');

    if(checkPost == null || !checkPost) {
      return res.status(400).json({
          success: false,
          error: validationError([{
              fieldName: 'post_id', 
              errorType: 'Not Found', 
              errorMessage: 'Posts not found.'
          }])
      })
  }

  let checkComment = await Comment.findOne({commentId});
  if(!checkComment){
    return res.status(400).json({
      success: false,
      error: validationError([{
          fieldName: 'comment_id', 
          errorType: 'Not Found', 
          errorMessage: 'Comment not found.'
      }])
  })
  }

    Comment.findByIdAndUpdate(
      commentId,
      { text: newComment },
      function (err, comment) {
        if (err) {
          return res.status(400).json({
            success: false,
            error: validationError([{
              fieldName: 'comment_id', 
              errorType: 'not updated', 
              errorMessage: 'Can not be updated.'
          }])
          });
        } else {
          return res.status(202).json({
            success: true,
            data: {
              updatedComment: comment,
            },
          });
        }
      }
    );
  },
  showComments: async function (req, res) {
    try {
      const allComments = await Comment.find({});
      return res.status(202).json({
        success: true,
        data: {
          allComments: allComments,
        },
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },

}