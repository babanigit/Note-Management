const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  passwd: {
    type: String,
    required: true
  },
  cPasswd: {
    type: String,
    required: true
  }
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
