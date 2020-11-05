const router = require("express").Router();
const multer = require("multer")
const food = require("../../models/food.js");

router.post("add-food", async (req, res) => {
  try {
    const { item_name, description } = req.body;
    const new_food = await new food({
      item_name,
      description,
    }).save();
    res.status(201).send(new_food);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
