const router = require("express").Router();
const user = require("../models/user.js");

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
    }

    else if (valid_phone) {
      res.send("phone number already registred");
    } else {
        const new_user = new user({
            full_name,
            email,
            password,
            phone,
            restaurant_name,
            address,
            zip_code
        })
        
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
});
