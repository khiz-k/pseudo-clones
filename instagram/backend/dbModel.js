import mongoose from 'mongoose';

const instaSchema = mongoose.Schema({
  caption: String,
  user: String,
  image: String,
  comments: [],
});

export default mongoose.model('posts', instaSchema);
