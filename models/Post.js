
const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User'},
    
    comments: [
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  });
  


module.exports = mongoose.model('Post', PostSchema);
