const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const driverSchema = new Schema({
  profilePic: {
    type: String, 
    default: 'No Photo'
  },
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
    default: 'DRIVER'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PENDING'],
    default: 'PENDING'
  },
  grua: {
    marca: String,
    tipo: String,
    placas: String
  }
},{
  timestamps:{
    createdAt: "created_at",
    updatedAt: "updates_at"
  }
});

driverSchema.plugin(PassportLocalMongoose, {usernameField: "email"});
module.exports = mongoose.model("Driver", driverSchema);