const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../../models/user.js");

router.post("/register", async (req, res) => {
  try {
    let {
      full_name,
      email,
      password,
      phone,
      restaurant_name,
      address,
      zip_code,
    } = req.body;

    console.log(
      full_name,
      email,
      password,
      phone,
      restaurant_name,
      address,
      zip_code
    );
    const invalid_email = await user.findOne({ email });
    const invalid_phone = await user.findOne({ phone });

    if (invalid_email) {
      res.send("email already registred");
    }

    if (invalid_phone) {
      res.send("phone number already registred");
    }

    await bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        password = hash;
        const new_user = new user({
          full_name,
          email,
          password,
          phone,
          restaurant_name,
          address,
          zip_code,
        }).save();
        res.status(201).send(new_user);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
