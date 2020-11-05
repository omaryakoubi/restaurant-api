const router = require("express").Router();
const multer = require("multer");
const food = require("../../models/food.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/food-images");
  },

  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()} ${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("add-food", upload.single("food_photo"), async (req, res) => {
  try {
    const { item_name, description } = req.body;
    const { photo } = req.file.path;
    const new_food = await new food({
      item_name,
      description,
      photo,
    }).save();
    res.status(201).send(new_food);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
