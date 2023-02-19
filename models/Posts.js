const mongoose = require('mongoose');

//Schema for a post
const PostSchema = new mongoose.Schema({
  post_id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Export the Post model
module.exports = mongoose.model('Post', PostSchema);
