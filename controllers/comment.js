const Comment = require("../models/Comments");
const Posts = require("../models/Post");

module.exports = {
  create: function (req, res) {
    // find out which post you are commenting

    create: async function (req, res){
    
        // find out which post you are commenting
        
        const id = req.params.id;
        console.log(id);
        // get the comment text and record post id
        const blogPost =  await Posts.findById(id);
      
        console.log(blogPost);
        
        const comment = new Comment({
         text: req.body.comment,
         post_id: id
      })
        // save comment
        await comment.save();
        // push the comment into the blogPost.comments array

      await blogPost.save(function(err) {
      if(err) {console.log(err)}
      res.status(200).send("comment added")
      })
      
      },


      // delete Controller
      delete: function(req,res){

        const comment_id = req.params.comment_id;
        console.log(comment_id);
        res.send("good");
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

  updateComment: function (req, res) {
    const commentId = req.body.commentId;

    const newComment = req.body.comment;

    Comment.findByIdAndUpdate(
      commentId,
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
};
