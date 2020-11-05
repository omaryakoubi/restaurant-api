const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  item_name: {
    required: true,
  },
  description: {
    required: true,
  },
  photo: {
    required: true,
  },
});

module.exports = mongoose.model("food", foodSchema);
