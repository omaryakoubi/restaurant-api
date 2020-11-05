const router = require("express").Router();
const food = require("../../models/food.js");

router.get("food-list", async (req, res) => {
  try {
    const food_list = await food.find({});
    res.send(food_list);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
