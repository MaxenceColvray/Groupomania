const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { type: String, required: true, },
  title: { type: String, required: true, },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  imageURL: { type: String, required: true }
});


module.exports = mongoose.model('Post', postSchema);