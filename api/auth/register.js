const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../../models/user.js");

router.post("login", async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      restaurant_name,
      address,
      zip_code,
    } = req.body;

    const valid_email = await findOne({ email });
    const valid_phone = await findOne({ phone });

    if (valid_email) {
      res.send("email already registred");
    } else if (valid_phone) {
      res.send("phone number already registred");
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
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
        }
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
