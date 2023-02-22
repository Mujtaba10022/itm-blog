const Posts = require("../models/Post");
const Users = require("../models/User");

module.exports = {
  create: async function (req, res) {
    const userId = req.params.userId;

    const user = await Users.findById(userId);

    const blogPost = new Posts({
      title: req.body.title,
      text: req.body.text,
    });
    //     // save post

    blogPost.save(async function (err, blogPost) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      } else {
        user.posts.push(blogPost);

        // save and send status

        await user.save(function (err) {
          if (err) {
            return res.status(400).json({
              success: false,
              error: err,
            });
          } else {
            return res.status(202).json({
              success: true,
              data: {
                user: user,
                blogPost: blogPost,
              },
            });
          }
        });
      }
    });
  },
};
