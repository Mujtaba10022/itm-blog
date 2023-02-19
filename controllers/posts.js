const Post = require('../models/Posts')

exports.addPost = async function(req, res, next) {
    try {
      const { post_id, title, description, userId } = req.body;
    
      const newPost = new Post({
        post_id,
        title,
        description,
        userId
      });
  
      const savedPost = await newPost.save();
      
  
      return res.status(201).json(savedPost);
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        })
        
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