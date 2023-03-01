/*
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
*/
const Post = require('../models/Post')

exports.addPost = async function(req, res, next) {
    try {

      const { title, description } = req.body;
      const  userId  = req.params.userId;
      const newPost = await new Post({
        title,
        description,
        userId
      });
  
      const savedPost = await newPost.save();
        
      return res.status(201).json(savedPost);

    } 
    catch (err) {

        return res.status(400).json({
            success: false,
            error: err
        })
        
    }
};


exports.readPost = async function (req, res, next) {
    
    try {
        const userId = await req.params.userId;
        const postsData = await Post.find({ userId: userId });
      
        if (postsData == null) {
            res.status(404).send("No Data Found");
        } else {
            res.json(postsData);
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        });
    }
};



exports.readByIdPost = async function (req, res, next) {

    try {
        const userId = await req.params.userId;
        const postId = await req.params.postId;
        const postData = await Post.findOne({ userId: userId, _id: postId });

        if (!postData) {
            res.status(404).send("Post Not Found");
        } else {
            res.json(postData);
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        });
    }
};



exports.updatePost = async function (req, res, next) {

    try {
        const postId = await req.params.postId;
        const userId = await req.params.userId;
        const newUpdatedAt = new Date();
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, userId: userId },
            { $set: { updatedAt: newUpdatedAt, ...req.body } },
            { new: true }
        );

        if (!updatedPost) {
            res.status(404).send("Post Not Found");
        } else {
            res.json(updatedPost);
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        });
    }
};


exports.deletePost = async function(req, res, next) {
    try {

        const { userId, postId } = req.params;
        const deletedPost = await Post.findOneAndDelete({ _id: postId, userId: userId });
        
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted successfully" });

    } 
    catch (err) {

        return res.status(400).json({
            success: false,
            error: err
        })

    }
};


