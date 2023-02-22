const Comment = require("../models/Comments");
const Posts = require("../models/Post");
const User = require("../models/User");

module.exports = {
  create:function (req, res) {

    // const result = await validate(req.body,User);
    // console.log(result);
    if(!req.body.comment){
      return res.status(400).send({
        success: false,
        error: "text is required",
      });
    }
    // find out which post you are commenting

    const postId = req.params.postId;
    // find out which user you are commenting

    const userId = req.params.userId;
    //********* */
    User.findById(userId, async function (err, user) {
      console.log(user);
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        console.log(postId);

        const blogPostId = user.posts.find((element) => element == postId);

        if (blogPostId == null) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        } else {
          const blogPost = await Posts.findById(blogPostId);

          if (blogPost == null) {
            return res.status(400).json({
              success: false,
              error: err,
            });
          } else {
            const comment = new Comment({
              text: req.body.comment,
              post: postId,
            });
            const error = await comment.validate();
            console.log(error);
            if (error) {
              return res.status(400).json({
                success: false,
                error: error,
              });
            }
//console.log(error);

            // save comment
            await comment.save(async function (err) {
              if (err) {
                return res.status(400).json({
                  success: false,
                  error: err,
                });
              } else {
                blogPost.comments.push(comment);

                await blogPost.save(function (err) {
                  if (err) {
                    return res.status(400).json({
                      success: false,
                      error: err,
                    });
                  } else {
                    return res.status(202).json({
                      success: true,
                      data: {
                        comment: comment,
                        blogPost: blogPost,
                        user: user,
                      },
                    });
                  }
                });
              }
            });
          }
        }
      }
    });
  },

  deleteComment: function (req, res) {
    const userId = req.params.userId;

    const postId = req.params.postId;

    const commentId = req.params.commentId;

    User.findById(userId, async function (err, user) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        const blogPostId = user.posts.find((element) => element == postId);

        if (blogPostId == null) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        } else {
          const blogPost = await Posts.findById(blogPostId);

          if (blogPost == null) {
            return res.status(400).json({
              success: false,
              error: err,
            });
          } else {
            const blogCommentId = blogPost.comments.find(
              (element) => element == commentId
            );

            Comment.findByIdAndDelete(blogCommentId, function (err) {
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
          }
        }
      }
    });
  },

  updateComment: function (req, res) {
    const newComment = req.body.comment;

    const userId = req.params.userId;

    const postId = req.params.postId;

    const commentId = req.params.commentId;

    User.findById(userId, async function (err, user) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        const blogPostId = user.posts.find((element) => element == postId);

        if (blogPostId == null) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        } else {
          const blogPost = await Posts.findById(blogPostId);

          if (blogPost == null) {
            return res.status(400).json({
              success: false,
              error: err,
            });
          } else {
            const blogCommentId = blogPost.comments.find(
              (element) => element == commentId
            );

            Comment.findByIdAndUpdate(
              blogCommentId,
              { text: newComment },
              function (err, comment) {
                if (err) {
                  return res.status(400).json({
                    success: false,
                    error: err,
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
          }
        }
      }
    });
  },

  showComments: async function (req, res) {
    const userId = req.params.userId;

    const postId = req.params.postId;

    User.findById(userId, async function (err, user) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        const blogPostId = user.posts.find((element) => element == postId);

        if (blogPostId == null) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        } else {
          const blogPost = await Posts.findById(blogPostId);

          if (blogPost == null) {
            return res.status(400).json({
              success: false,
              error: err,
            });
          } else {
            try {
              const allComments = await Comment.find({ post: postId });

              console.log(allComments);

              return res.status(202).json({
                success: true,
                data: {
                  allComments: allComments,
                  user: user,
                  blogPost: blogPost,
                },
              });
            } catch (err) {
              return res.status(400).json({
                success: false,
                error: err,
              });
            }
          }
        }
      }
    });
  },
};
