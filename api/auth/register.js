const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../../models/user.js");

router.post("register", async (req, res) => {
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
    }
    
    if (valid_phone) {
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
    }
   catch (error) {
    res.status(500).send(error);
    console.log(error)
  }
});

module.exports = router;
