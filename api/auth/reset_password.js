const router = require("express").Router();
const nodeMailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const user = require("../../models/user.js");
require("dotenv").config;

// # SEND EMAIL TO THE ADMIN EMAIL #
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const userInfo = await user.findOne({ email });
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000;

    if (email === "") {
      res.send("Email required");
    }

    if (userInfo === null) {
      console.error("email not found in the db");
      res.send("user not exist in the database");
    }

    await user.findOneAndUpdate(
      { email },
      { resetPasswordToken, resetPasswordExpires }
    );

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "reset password",
      text: `to set your new password please
             click here : http://localhost:4200/${resetPasswordToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json("recovery email sent");
  } catch (error) {
    return res.status(403).json(error);
  }
});

// # RESET THE PASSWORD OF THE ADMIN #
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const userInfo = await user.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!userInfo) {
      res.send("invalid token");
    }

    if (userInfo.resetPasswordExpires < Date.now()) {
      userInfo.resetPasswordToken = "";
      userInfo.resetPasswordExpires = 0;
      await user.save();
      res.send("token expired");
    }
    
    userInfo.resetPasswordToken = "";
    userInfo.resetPasswordExpires = 0;
    userInfo.password = await bcrypt.hash(password, 10);
    await user.save();
    res.send("new password setted");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
