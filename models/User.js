const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
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
    enum: ['ADMIN', 'user', 'driver'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PENDING'],
    default: 'PENDING'
  },
  address: {
    coord:[],
    street: String,
    number: Number,
    city: String,
    state: String,
    cp: Number
  },
  car: {
    marca: String,
    modelo: String,
    year: String,
    placas: String
  },
  grua: {
    gruaMarca: String,
    tipo: String,
    gruaPlacas: String
  }
},{
  timestamps:{
    createdAt: "created_at",
    updatedAt: "updates_at"
  }
});

userSchema.plugin(PassportLocalMongoose, {usernameField:"email"});
module.exports = mongoose.model("User", userSchema);