const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("food", foodSchema);
