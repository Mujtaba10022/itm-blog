const mongoose = require('mongoose');
const Comment = require("../models/Comments");
const Posts = require("../models/Post");
var Users = require('../models/User');

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

  // deleteComment: function (req, res) {
  //   const userId = req.params.userId;

  //   const postId = req.params.postId;

  //   const commentId = req.params.commentId;

  //   User.findById(userId, async function (err, user) {
  //     if (err) {
  //       return res.status(400).json({
  //         success: false,
  //         error: err,
  //       });
  //     } else {
  //       const blogPostId = user.posts.find((element) => element == postId);

  //       if (blogPostId == null) {
  //         return res.status(400).json({
  //           success: false,
  //           error: err,
  //         });
  //       } else {
  //         const blogPost = await Posts.findById(blogPostId);

  //         if (blogPost == null) {
  //           return res.status(400).json({
  //             success: false,
  //             error: err,
  //           });
  //         } else {
  //           const blogCommentId = blogPost.comments.find(
  //             (element) => element == commentId
  //           );

  //           Comment.findByIdAndDelete(blogCommentId, function (err) {
  //             if (err) {
  //               return res.status(400).json({
  //                 success: false,
  //                 error: err,
  //               });
  //             } else {
  //               return res.status(202).json({
  //                 success: true,
  //                 message: "comment deleted",
  //               });
  //             }
  //           });
  //         }
  //       }
  //     }
  //   });
  // },
  deleteComment: async function (req, res) {

    const commentId = req.params.comment_id;
    const postId = req.params.post_id;
    const userId = req.params.user_id;
    console.log(commentId + " " + postId + " " + userId);

    if (mongoose.Types.ObjectId.isValid(commentId) &&
        mongoose.Types.ObjectId.isValid(postId) &&
        mongoose.Types.ObjectId.isValid(userId)
    ) {
        const userData = await Users.findById(userId);
        if (userData) {

            const postData = await Posts.findById(postId);
            if (postData) {

                // both user and post exist, delete comment here
                const deletedComment = await Comment.findByIdAndDelete(commentId);

                if (deletedComment == null) {

                    return res.status(202).json({
                        success: false,
                        message: 'Comment already deleted',
                        deletedComment: deletedComment,
                    });
                }
                else {

                    return res.status(202).json({
                        success: true,
                        message: 'Comment deleted',
                        deletedComment: deletedComment,
                    });
                }

            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found',
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: 'Invalid comment ID ,user ID or post ID',
        });
    }


},
  // updateComment: function (req, res) {

  //   if(!req.body.comment){
  //     return res.status(400).send({
  //       success: false,
  //       error: "text is required",
  //     });
  //   }

  //   const newComment = req.body.comment;

  //   const userId = req.params.userId;

  //   const postId = req.params.postId;

  //   const commentId = req.params.commentId;

  //   User.findById(userId, async function (err, user) {
  //     if (err) {
  //       return res.status(400).json({
  //         success: false,
  //         error: err,
  //       });
  //     } else {
  //       const blogPostId = user.posts.find((element) => element == postId);

  //       if (blogPostId == null) {
  //         return res.status(400).json({
  //           success: false,
  //           error: err,
  //         });
  //       } else {
  //         const blogPost = await Posts.findById(blogPostId);

  //         if (blogPost == null) {
  //           return res.status(400).json({
  //             success: false,
  //             error: err,
  //           });
  //         } else {
  //           const blogCommentId = blogPost.comments.find(
  //             (element) => element == commentId
  //           );

  //           Comment.findByIdAndUpdate(
  //             blogCommentId,
  //             { text: newComment },
  //             function (err, comment) {
  //               if (err) {
  //                 return res.status(400).json({
  //                   success: false,
  //                   error: err,
  //                 });
  //               } else {
  //                 return res.status(202).json({
  //                   success: true,
  //                   data: {
  //                     updatedComment: comment,
  //                   },
  //                 });
  //               }
  //             }
  //           );
  //         }
  //       }
  //     }
  //   });
  // },

  updateComment: async function (req, res) {
    const commentId = req.params.comment_id;
    const postId = req.params.post_id;
    const userId = req.params.user_id;
    const update = req.body.text;
    console.log(commentId + " " + postId + " " + userId + " " + update);

    if (mongoose.Types.ObjectId.isValid(commentId) &&
        mongoose.Types.ObjectId.isValid(postId) &&
        mongoose.Types.ObjectId.isValid(userId)) {
        const userData = await Users.findById(userId);
        if (userData) {

            const postData = await Posts.findById(postId);
            if (postData) {

                // both user and post exist, update comment here
                 //const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body.text, { new: true });

                 const updatedComment = await Comment.findOneAndUpdate(
                  { _id: commentId },
                  { text: req.body.text },
                  { new: true }
              );
                console.log(updatedComment)
                if (updatedComment == null) {

                    return res.status(404).json({
                        success: false,
                        message: 'Comment not found',
                    });
                } else {

                    return res.status(200).json({
                        success: true,
                        message: 'Comment updated',
                        updatedComment: updatedComment,
                    });
                }

            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found',
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: 'Invalid comment ID ,user ID or post ID',
        });
    }
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
