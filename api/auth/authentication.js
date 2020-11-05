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
          token: "",
          resetPasswordToken: "",
        }).save();
        res.status(201).send(new_user);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const userInfo = await user.findOne({ phone });
    if (userInfo) {
      bcrypt.compare(password, userInfo.password, async (err, result) => {
        if (err) {
          res.status(500).send("auth failed wrong");
        }

        if (result) {
          const _id = userInfo._id;
          const token = jwt.sign({ _id, phone }, process.env.JWT_KEY);
          await user.findOneAndUpdate(phone, { token });
          res.send(token);
        }
      });
    } else {
      res.send("user by this phone number doesen't exist");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body;
    const removeToken = "";
    await user.findOneAndUpdate(token, { removeToken });
    res.status(200).send("user logged out");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
