import mongoose from "mongoose";
// const mongoose = require("mongoose");

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  dsscription: String,
  shares: String,
});

export default mongoose.model("tiktokVideos", tiktokSchema);

// module.exports = mongoose.model("tiktokVideos", tiktokSchema);
