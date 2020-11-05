const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  restaurant_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
