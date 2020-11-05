const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user.js");

router.post("/signup", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const userInfo = user.findOne({ phone });

    if (userInfo) {
      bcrypt.compare(password, userInfo.password, (err, result) => {
        if (err) {
          res.status.send("auth failed wrong");
        }

        if (result) {
          const token = jwt.sign({ _id, phone }, process.env.JWT_KEY);
          res.json(token);
        }
      });
    } else {
      res.send("user by this phone number doesen't exist");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
