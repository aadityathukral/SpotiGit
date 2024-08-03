import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  spotifyUserId: String,
});

export default mongoose.model("User", userSchema);
