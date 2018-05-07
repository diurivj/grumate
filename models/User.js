const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER', 'DRIVER'],
    default: 'USER'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PENDING'],
    default: 'PENDING'
  },
  profilePic: String,
},{
  timestamps:{
    createdAt: "created_at",
    updatedAt: "updates_at"
  }
});

userSchema.plugin(PassportLocalMongoose, {usernameField:"email"});
module.exports = mongoose.model("User", userSchema);